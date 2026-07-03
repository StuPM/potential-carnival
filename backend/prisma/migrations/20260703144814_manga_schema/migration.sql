/*
  Warnings:

  - You are about to drop the column `tmdbId` on the `Film` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `Film` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "MEDIATYPE" ADD VALUE 'manga';

-- DropIndex
DROP INDEX "Film_tmdbId_key";

-- AlterTable 
ALTER TABLE "Film" RENAME COLUMN "tmdbId" to "externalId";

-- CreateTable
CREATE TABLE "Manga" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "originalLanguage" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "genres" TEXT[],

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manga_externalId_key" ON "Manga"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_posterPath_key" ON "Manga"("posterPath");

-- CreateIndex
CREATE UNIQUE INDEX "Film_externalId_key" ON "Film"("externalId");

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_id_fkey" FOREIGN KEY ("id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
