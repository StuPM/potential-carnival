import { Hono } from "hono";
import prisma from "../lib/prisma.js";
import { graphql } from "../generated/gql.js";
import { hardcover } from "../lib/hardcover.js";

const test = graphql(`
  query MyQuery {
    me {
      books_count
    }
  }
`);

const app = new Hono().get("/", async (c) => {
  const data = await hardcover(test);

  return c.json(data);
});

export default app;
