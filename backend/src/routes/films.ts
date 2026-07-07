import { Hono } from "hono";
import prisma from "../lib/prisma.js";
import { MEDIATYPE } from "../generated/prisma/client.js";
import { sValidator } from "@hono/standard-validator";
import { filmPostSchema, filmQuerySchema } from "../schemas/films.schema.js";
import { onValidationError } from "../schemas/validations.js";
import { tmdbGenreMap } from "../lib/tmdbGenres.js";

/**
 * Custom films only function that are mounted onto the films factory when it is created
 */
const app = new Hono()
  // TODO Flesh out further
  .get(
    "/search",
    sValidator("query", filmQuerySchema, onValidationError),
    async (c) => {
      const { query } = c.req.valid("query");
      
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` } },
      );

      const data = await res.json();

      return c.json(data.results);
    },
  )
  .post(
    "/",
    sValidator("json", filmPostSchema, onValidationError),
    async (c) => {
      const body = c.req.valid("json");

      const uniqueID = MEDIATYPE.film + "-" + body["id"];

      const createMedia = await prisma.media.upsert({
        where: { id: uniqueID },
        create: {
          id: uniqueID,
          type: MEDIATYPE.film,
          film: {
            create: {
              externalId: body.id,
              title: body.title,
              originalTitle: body.originalTitle,
              originalLanguage: body.originalLanguage,
              overview: body.overview,
              posterPath: body.posterPath,
              releaseDate: new Date(body.releaseDate),
              genres: tmdbGenreMap(body.genreIds),
            },
          },
          mediaHistory: {
            create: {
              // mediaId: uniqueID, - No need to include as FK included as default
              finished: new Date(body.finished),
              rating: body.rating,
              review: body.review,
              location: body.location,
            },
          },
        },
        update: {
          film: { update: { watchedCount: { increment: 1 } } },
          mediaHistory: {
            create: {
              finished: new Date(body.finished),
              rating: body.rating,
              review: body.review,
              location: body.location,
            },
          },
        },
      });

      return c.json(createMedia);
    },
  );

export default app;
