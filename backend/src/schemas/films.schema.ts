import { type } from "arktype";
import { mediaHistorySchema } from "./factory.schema.js";

export const filmSchema = type({
  tmdbId: type("string.numeric.parse |> number > 0"),
});

export const filmQuerySchema = type({
  query: "string >= 3",
});

export const filmPostSchema = type({
  id: "number",
  title: "string",
  originalTitle: "string",
  originalLanguage: "string",
  overview: "string",
  posterPath: "/([a-z0-9\-]*.(?:jpg|png))/",
  releaseDate : "string.date",
  genreIds : "number[]"
}).and(mediaHistorySchema)
