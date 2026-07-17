import { print } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

const HARDCOVER_ENDPOINT = "https://api.hardcover.app/v1/graphql";

/**
 * Execute a generated Hardcover operation.
 *
 * Pass a document from the `graphql()` tag; result and variables are fully
 * typed off the generated TypedDocumentNode. Auth uses HARDCOVER_TOKEN.
 */
export async function hardcover<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
): Promise<TResult> {

  const res = await fetch(HARDCOVER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HARDCOVER_TOKEN}`,
    },
    body: JSON.stringify({ query: print(document), variables }),
  });

  const json = (await res.json()) as {
    data?: TResult;
    errors?: unknown;
  };

  if (json.errors) {
    throw new Error(`Hardcover GraphQL error: ${JSON.stringify(json.errors)}`);
  }

  return json.data as TResult;
}