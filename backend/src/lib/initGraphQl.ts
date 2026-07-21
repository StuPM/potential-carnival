import { initGraphQLTada } from "gql.tada";
import type { introspection } from "../graphql/hardcover-env.js";

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    timestamp: string; // adjust to whatever custom scalars Hardcover uses
    jsonb: unknown;
  };
}>();
