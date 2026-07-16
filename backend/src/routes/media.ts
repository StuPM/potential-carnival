import { Hono } from "hono";
import prisma from "../lib/prisma.js";

const app = new Hono().get("/", async (c) => {
  // TODO Paginate the data returned
  // TODO Param - Year, page size?
  // TODO What if we cant find any?
  // TODO We can likely get rid of the get("/") in the factory

  // TODO Look through the enum so that we dont have to edit this every table change 
  const res = await prisma.media.findMany({
    include: {
      film: true,
      manga: true
    },
  });

  const mediaFiltered = res.map(({ film, manga, ...media }) => {

    const details = film ? film : manga

    return { ...media, details};
  });

  return c.json(mediaFiltered);
});

export default app;
