import { Hono } from "hono";
import { print } from "@0no-co/graphql.web";
import { graphql } from "../lib/initGraphQl.js";

const searchHardcover = graphql(`
  query Test($id: String!) {
    search(query: $id, per_page: 10) {
      error
      page
      per_page
      query
      results
    }
  }
`);

const insertReadBook = graphql(`
  mutation MarkRead($bookId: Int!) {
    insert_user_book(object: { book_id: $bookId, status_id: 3 }) {
      id
      error
    }
  }
`);

/**
 * PLAN
 * Save a book to the database and hardcover
 * Possible when I edit a review also?
 *
 */
const app = new Hono()
  /**
   * Search for a book from Hardcover
   * TODO Validate
   */
  .get("/search", async (c) => {
    const query = c.req.query("query");

    // TODO Pull this out into an external fuction
    const res = await fetch("https://api.hardcover.app/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.HARDCOVER_TOKEN}`,
      },
      body: JSON.stringify({
        query: print(searchHardcover),
        variables: { id: query },
      }),
    });

    const data = await res.json();

    console.log(data);

    return c.json(data);
  })
  .post("/", (c) => {
    const body = c.req.query("json");

    const uniqueID = 'BOOK' + '-' + body['id']

    

    return c.notFound();
  });
export default app;
