import { Hono } from "hono";
import prisma from "../lib/prisma.js";

const app = new Hono().get("/", async (c) => {
  // TODO Paginate the data returned
  // TODO Param - Year, page size?
  // TODO What if we cant find any?
  // TODO We can likely get rid of the get("/") in the factory

  // TODO Look through the enum so that we dont have to edit this every table change
  const res = await prisma.mediaHistory.findMany({
    orderBy: {
      finished: "desc",
    },
    include: {
      media: {
        include: {
          film: true,
          manga: true,
        },
      },
    },
  });

  // Flattern the history record and remove the blank include record
  const mediaFiltered = res.map(({ media, ...history }) => {
    const details = media.film ?? media.manga;

    // Keep type even though we could derive it from the id
    return {
      ...history,
      media: { ...details, type: media.type },
    };
  });

  return c.json(mediaFiltered);
});

export default app;
