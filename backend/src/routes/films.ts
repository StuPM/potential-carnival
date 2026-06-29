import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import { onValidationError } from "../schemas/validations.js";

import { filmQuerySchema } from "../schemas/films.js";

/**
 * Custom films only function that are mounted onto the films factory when it is created
 */
const app = new Hono()
  // TODO Flesh out further
  .get(
    "/search",
    sValidator("query", filmQuerySchema, onValidationError),
    async (c) => {
      const query = c.req.query("query");
      if (!query) return c.json({ error: "q is required" }, 400);

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` } },
      );

      const data = await res.json();

      console.log(data);

      return c.json(data.results);
    },
  );

export default app;
