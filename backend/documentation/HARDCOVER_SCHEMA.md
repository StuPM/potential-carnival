# Updating Hardcover GraphQL Schema

Run this whenever Hardcover changes their schema.

## 1. Re-download the schema

```bash
npx gql-tada generate-schema https://api.hardcover.app/v1/graphql \
  --header "Authorization: Bearer YOUR_HARDCOVER_TOKEN" \
  --output ./src/graphql/hardcover.graphql
```

Overwrites `hardcover.graphql` with the latest SDL from Hardcover's API.

## 2. Regenerate the TypeScript types

```bash
npx gql-tada generate-output
```

This reads `hardcover.graphql` and rewrites `hardcover-env.d.ts`.

## 3. Check for breaking changes

```bash
npx gql-tada check
```

Runs the existing queries against the new schema and flags anything that no longer type-checks.

## 4. Confirm the new custom scalars (if any)

If step 3 flags an unknown scalar type, open `hardcover.graphql` and searchfor `scalar` declarations:

```bash
grep "^scalar" src/graphql/hardcover.graphql
```

Add any new ones to the `scalars` object in `src/graphql/hardcover.ts`:

```ts
export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    timestamp: string;
    jsonb: unknown;
    // add new scalar mappings here
  };
}>();
```

## 5. Sanity check the whole setup

```bash
npx gql-tada doctor
```

Validates the `tsconfig.json` plugin config, schema file, and output file are all in sync.

## 6. Restart the TS server in VS Code

`Cmd/Ctrl+Shift+P` → **TypeScript: Restart TS Server**
