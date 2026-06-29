import { Hono } from "hono";
import { logger } from "hono/logger";

import prisma from "./lib/prisma.js";
import { MEDIATYPE } from "./generated/prisma/enums.js";

import { createMediaFactory } from "./routes/factory.js";
 

import filmsRouter from "./routes/films.js";



 
const films = createMediaFactory({ 
  model: prisma.film, // Pass in the relevant prisma information
  prefix: MEDIATYPE.film, // Prefix used in the id  
  routes: filmsRouter, // Specific film routes
});

// const books = createMediaFactory({ api : bookAdapter, model : prisma.books, prefix : "book"})
// const anime = createMediaFactory({ api : bookAdapter, model : prisma.books, prefix : "book"})

const app = new Hono()
  .use(logger()) 
  .route("/films", films)
  .notFound((c) => c.json({ error: "Not found" }, 404));

export default app;
