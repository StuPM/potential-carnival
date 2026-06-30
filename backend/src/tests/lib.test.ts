import { describe, expect, it } from "vitest";
import { tmdbGenreMap } from "../lib/tmdbGenres.js";

describe("TMDB Genres", () => {
  it("Should match the ids to strings", async () => { 

    expect(tmdbGenreMap([14, 10402, 35, 16])).toStrictEqual([
      "fantasy",
      "music",
      "comedy",
      "animation",
    ]);
  });
});
