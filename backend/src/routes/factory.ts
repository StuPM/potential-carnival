import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import prisma from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import {
  mediaHistorySchema,
  idParamSchema,
  includeQuerySchema,
} from "../schemas/factory.schema.js";
import { onValidationError } from "../schemas/validations.js";

import { MEDIATYPE } from "../generated/prisma/client.js";


interface ModelConfig {
  findMany: () => Promise<unknown[]>;
  delete: (args: { where: { id: string } }) => Prisma.PrismaPromise<unknown>;
}

interface FactoryConfig {
  model: ModelConfig;
  prefix: MEDIATYPE;
  routes?: Hono;
}

/**
 * FACTORY MODEL
 *
 * These are the consistent routes between the different models
 *
 * @param config for the factory
 * @returns typed hono routes
 */
export function createMediaFactory(config: FactoryConfig) {
  // Conditionally push on the factory custom routes if supplied, they have priority over the default routes
  const baseHono = config.routes
    ? new Hono().route("/", config.routes)
    : new Hono();

  return (
    baseHono
      /**
       * Get all records for the factory type
       */
      .get("/", async (c) => {
        // TODO Paginate the data returned
        // TODO Param - Year, page size?
        // TODO What if we cant find any?

        const res = await config.model.findMany();
        return c.json(res);
      })
      /**
       * Get a single record
       */
      .get(
        "/:id",
        sValidator("param", idParamSchema, onValidationError),
        sValidator("query", includeQuerySchema, onValidationError),
        async (c) => {
          const { id } = c.req.valid("param");
          const query = c.req.query("include")?.split(",");

          const res = await prisma.media.findUnique({
            where: { id: config.prefix + "-" + id },
            include: {
              [config.prefix]: query?.includes(config.prefix) ?? false,
              mediaHistory: query?.includes("history") ?? false,
            },
          });

          if (!res) return c.notFound();

          return c.json(res);
        },
      )

      /**
       * Patch Edit an already existing history
       */
      .patch(
        "/:id",
        sValidator("json", mediaHistorySchema, onValidationError),
        async (c) => {
          // TODO Ensure that we already have the film in the database beforehand
          // TODO Validate the history object
          // TODO Only update what has changed

          // TODO Validate id and body
          const id = c.req.param("id");
          const body = await c.req.json();

          const finshedTemp = body["finishedAt"]
            ? new Date(body["finishedAt"])
            : undefined;

          try {
            // Ignore if undefined and dont add it to the Prisma query
            const updateHistory = await prisma.mediaHistory.update({
              where: { id: id },
              data: {
                finished: finshedTemp,
                rating: body["rating"] || undefined,
                location: body["cinema"] || undefined,
                review: body["review"] ?? undefined,
              },
            });

            return c.json(updateHistory);
          } catch (e) {
            // TODO Pull this into own function return errorchecker(e)
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
              if (e.code === "P2025") {
                console.log(
                  "There is a unique constraint violation, a new user cannot be created with this email",
                );
              }
            }

            return c.json({ error: "Bad request" }, 400);
          }
        },
      )
      /**
       * Delete
       *
       * Within a transation delete the specified history record
       * If that history was the last one, then we also need to delete the other relevant records and casade the deletion
       */
      .delete("/:id", async (c) => {
        // let recordId = c.req.param("id");
        // recordId = config.prefix + "-" + recordId;

        // TODO Validate this
        const id = c.req.param("id");

        // Find the history record
        const historyRecord = await prisma.mediaHistory.findUnique({
          where: {
            id: id,
          },
        });

        // TODO If we cant find the history record
        if (!historyRecord) return c.notFound();

        // Get the count of historys for this media
        const historyCount = await prisma.mediaHistory.count({
          where: {
            mediaId: historyRecord["mediaId"],
          },
        });

        let deleteRecord;

        // If count is 1, then only record so delete Media record to cascade delete
        if (historyCount == 1) {
          deleteRecord = await prisma.media.delete({
            where: {
              id: historyRecord["mediaId"],
            },
          });
        } else {
          // Otherwise
          deleteRecord = await prisma.mediaHistory.delete({
            where: {
              id: id,
            },
          });
        }

        return c.json(deleteRecord);
      })
  );
}
