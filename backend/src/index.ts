import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import prisma from "./lib/prisma.js";
import { MEDIATYPE } from "./generated/prisma/enums.js";

import { createMediaFactory } from "./routes/factory.js";

import stats from "./routes/stats.js";
import media from "./routes/media.js";
import filmsRouter from "./routes/films.js";
import mangaRouter from "./routes/manga.js";

const film = createMediaFactory({
  model: prisma.film, // Pass in the relevant prisma information
  prefix: MEDIATYPE.film, // Prefix used in the id
  routes: filmsRouter, // Specific film routes
});

const manga = createMediaFactory({
  model: prisma.manga,
  prefix: MEDIATYPE.manga,
  routes: mangaRouter,
});

// const books = createMediaFactory({ api : bookAdapter, model : prisma.books, prefix : "book"})
// const anime = createMediaFactory({ api : bookAdapter, model : prisma.books, prefix : "book"})

const app = new Hono()
  .use(logger())
  // TODO Flesh out cors further to make it more secure
  .use(
    cors({
      origin: ["http://localhost:5173", "https://trackmyfilms.spmcgee.dev"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .route("/stats", stats)
  .route("/media", media)
  .route("/film", film)
  .route("/manga", manga)
  .notFound((c) => c.json({ error: "Not found" }, 404));

export default app;
