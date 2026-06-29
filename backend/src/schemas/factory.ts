import { type } from "arktype";

export const idParamSchema = type({
  id: "string.numeric.parse |> number > 0",
});

/**
 * Include
 * Optional, type string, split by a comma, check each is valid result
 */
export const includeQuerySchema = type({
  "include?": type("string")
    .pipe((s) => s.split(",").filter(Boolean))
    .to(type(`("history" | "test" | "film")[]`)),
});

export const historySchema = type({
  "finished?": `Date < ${Date.now()}`,
  "rating?": "0 < number <= 10",
  "location?": "'cinema' | 'home'",
  "review?": "string",
});
