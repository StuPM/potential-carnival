import { Hono } from "hono";
import prisma from "../lib/prisma.js";
import { MEDIATYPE } from "../generated/prisma/client.js";
import { sValidator } from "@hono/standard-validator";
import { mangaPostSave } from "../schemas/manga.schema.js";
import { onValidationError } from "../schemas/validations.js";

/**
 * Custom manga only functions
 */
const app = new Hono()
  // TODO Add validation
  .get("/search", async (c) => {
    const query = c.req.query("query");
    if (!query) return c.json({ error: "q is required" }, 400);

    const res = await fetch(
      `https://api.mangadex.org/manga?title=${encodeURIComponent(query)}&includes[]=author&includes[]=cover_art&includes[]=artist`,
    );

    if (!res.ok) {
        const status = res.status === 404 ? 400 : 502;
        return c.json({ message: "Manga not found on MANGADEX" }, status);
      }

    const data = await res.json();
    return c.json(data.data);
  })
  .post(
    "/",
    sValidator("json", mangaPostSave, onValidationError),
    async (c) => {
      const body = c.req.valid("json");

      const uniqueID = MEDIATYPE.manga + "-" + body["id"];

      const createMedia = await prisma.media.upsert({
        where: { id: uniqueID },
        create: {
          id: uniqueID,
          type: MEDIATYPE.manga,
          manga: {
            create: {
              externalId: body["id"],
              title: body["title"],
              originalTitle: body["originalTitle"],
              originalLanguage: body["originalLanguage"],
              overview: body["description"],
              posterPath: body["posterPath"],
              releaseDate: new Date(body["releaseDate"], 0, 1), // MangaDex only store year
              genres: body["genres"],
            },
          },
          mediaHistory: {
            create: {
              // mediaId: uniqueID, - No need to include as FK included as default
              finished: new Date(body["finished"]),
              rating: body["rating"],
              review: body["review"],
              location: body["location"],
            },
          },
        },
        update: {
          mediaHistory: {
            create: {
              finished: new Date(body["finished"]),
              rating: body["rating"],
              review: body["review"],
              location: body["location"],
            },
          },
        },
      });

      return c.json(createMedia);
    },
  );

export default app;
