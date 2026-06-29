# HONO Backend

IDEA: A typed, validated and tested Hono backend for my media tracking website.

## Links

- Backend : Vercel
- Database : Prisma

## TODO

- Authentication for admin routes, post, patch, delete.
- Authentication for the rest, making sure it only comes from the frontend or testing.
- Rate limiting
- Etag
- External logging
- OpenAPI docs - https://honohub.dev/docs/openapi/arktype
- Stats

## Factory

In order to reduce the amount of duplicate CRUD functions, I've implemented a factory solution to build up similar routes for the different media types, films, books etc.

Each factory them imports its own specific factory config for routes and data that are no similar. E.g. only the film factory needs to talk to tmdb.
