import { Hono } from "hono";
import prisma from "../lib/prisma.js";

/**
 * TODO Further stats possibilites 
 *     - Pull these into own api routes * 
 * 
 * Average rating
 * rating distrubition
 * Entries this year
 * Entries over time - graph a timeline
 * Reviews
 * Rewatches
 * Current streak
 * 
 * Breakdown by type
 * Average rating per type
 * 
 * Top Genres
 * Films by release
 * Langues
 * Most watched
 */

const app = new Hono().get("/", async (c) => {
  const [lastUpdated, totalEntries] = await Promise.all([
    prisma.mediaHistory.findFirst({
      orderBy: { created: "desc" },
    }),
    prisma.mediaHistory.count(),
  ]);

  return c.json({
    lastUpdated : lastUpdated?.finished , 
    totalEntries,
  });
});

export default app;