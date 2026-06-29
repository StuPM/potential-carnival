# PRISMA

## Making a schema change and applying the result

### 1. Edit the schema
Add/change the field in `prisma/schema.prisma`, e.g. `genres Int[]`.

### 2. Create a migration (development)
```
npx prisma migrate dev --name add_genres
```
This generates a new SQL migration file, applies it to the dev database and regenerates the client code automatically.

> Use `migrate dev` for local development only — not against production (see step 5).

### 3. Check the migration
Review the SQL in `prisma/migrations/<timestamp>_add_genres/migration.sql` to validate it yourself. 
These files are committed to git and are the source of truth — reviewers check the SQL, not just the schema.

### 4. Update your code
Anywhere the change is used in the code you will need to update it; the regenerated client's types will highlight any issues.

### 5. Regenerate the client (when needed)
```
npx prisma generate
```
Already covered by `migrate dev`, so you only need this manually when the client is out of sync — e.g. after pulling someone else's schema/migration changes without running a migration yourself, or after changing generator config / installing deps.

### 6. Apply to production
Never run `migrate dev` in production. Use:
```
npx prisma migrate deploy
```
This only applies pending migrations — no prompts, no schema diffing, no client regeneration. Run it in CI/CD or your release step. Use `npx prisma migrate status` to see which migrations are applied vs pending.
