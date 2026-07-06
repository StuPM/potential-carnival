import { type } from "arktype";
import { idParamSchema, mediaHistorySchema } from "./factory.schema.js";

const genres = type("string.lower");

const year = new Date().getFullYear();

export const mangaPostSave = type({ 
  title: "string > 3",
  originalTitle: "string",
  originalLanguage: "string <= 3",
  description: "string",
  posterPath: "/([a-z0-9\-]*.(?:jpg|png))/",
  releaseDate: type("number").narrow((n) => n > 1900 && n <= year),
  genres: genres.array(),
})
  .and(idParamSchema)
  .and(mediaHistorySchema);
