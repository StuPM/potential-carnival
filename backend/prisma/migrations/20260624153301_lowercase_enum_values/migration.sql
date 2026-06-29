/*
  Warnings:

  - The values [BOOK,FILM] on the enum `MEDIATYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MEDIATYPE_new" AS ENUM ('book', 'film');
ALTER TABLE "Media" ALTER COLUMN "type" TYPE "MEDIATYPE_new" USING ("type"::text::"MEDIATYPE_new");
ALTER TYPE "MEDIATYPE" RENAME TO "MEDIATYPE_old";
ALTER TYPE "MEDIATYPE_new" RENAME TO "MEDIATYPE";
DROP TYPE "public"."MEDIATYPE_old";
COMMIT;
