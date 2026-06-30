import { testClient } from "hono/testing";
import { describe, expect, it } from "vitest";
import app from "../index.js";

describe("Factory - Films", () => {
  const client = testClient(app);

  //   Call the base route

  it("Should return 200 and results", async () => {
    const res = await client.films.$get("/");

    expect(res.status).toBe(200);
  });

  it("Matrix - Media only", async () => {
    const res = await client.films[":id"].$get({
      param: { id: "603" },
      query: {},
    });
    const body = await res.json();
    
    expect(res.status).toBe(200);
    expect(body).toEqual({
      id: "film-603",
      type: "film",
      created: "2026-02-12T16:25:47.363Z",
    });
  });

  it("Matrix - Media and Film", async () => {
    const res = await client.films[":id"].$get({
      param: { id: "603" },
      query: { include: "film" },
    });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toHaveProperty("created");
    expect(body).toMatchObject({
      id: "film-603",
      type: "film",
      film: {
        id: "film-603",
        tmdbId: 603,
        title: "The Matrix",
        originalTitle: "The Matrix",
        originalLanguage: "en",
        overview:
          "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
        posterPath: "/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
        releaseDate: "1999-03-31T00:00:00.000Z",
        watchedCount: 1,
        genres: ["action", "science fiction"],
      },
    });
  });

  it("Matrix - Media, Film and History", async () => {
    const res = await client.films[":id"].$get({
      param: { id: "603" },
      query: { include: "film,history" },
    });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toHaveProperty("created");
    expect(body).toHaveProperty("mediaHistory[0]");
    expect(body).toHaveProperty("mediaHistory[0].id");
    expect(body).toHaveProperty("mediaHistory[0].created");
    expect(body).toMatchObject({
      id: "film-603",
      type: "film",
      // created: "2026-02-12T16:25:47.363Z",
      film: {
        id: "film-603",
        tmdbId: 603,
        title: "The Matrix",
        originalTitle: "The Matrix",
        originalLanguage: "en",
        overview:
          "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
        posterPath: "/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
        releaseDate: "1999-03-31T00:00:00.000Z",
        watchedCount: 1,
        genres: ["action", "science fiction"],
      },
      mediaHistory: [
        {
          // id: "cmqtituej0000govcehqu3coq",
          mediaId: "film-603",
          // created: "2026-06-25T13:11:35.467Z",
          finished: "2025-05-05T00:00:00.000Z",
          rating: 10,
          location: "cinema",
          review: null,
        },
      ],
    });
  });
});
