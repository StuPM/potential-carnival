import { type } from "arktype";
import { MEDIATYPE } from "../generated/prisma/client.js";

export const idParamSchema = type({
  id: "string > 3",
});

/**
 * Include
 * Optional, type string, split by a comma, check each is valid result
 */
export const includeQuerySchema = type({
  "include?": type("string")
    .pipe((s) => s.split(",").filter(Boolean))
    .to(type.enumerated("history", ...Object.values(MEDIATYPE)).array()),
});

/**
 * Media History
 * Used in POST requests when saving a new record
 */
export const mediaHistorySchema = type({
  finished: `Date < ${Date.now()}`,
  rating: "0 < number <= 10",
  "location?": "'cinema' | 'home' | null",
  "review?": "string",
});
