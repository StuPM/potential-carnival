/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `MediaHistory` table. All the data in the column will be lost.
  - You are about to drop the `Films` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `Media` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `finished` to the `MediaHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MEDIATYPE" AS ENUM ('BOOK', 'FILM');

-- DropForeignKey
ALTER TABLE "Films" DROP CONSTRAINT "Films_id_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "createdAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "type",
ADD COLUMN     "type" "MEDIATYPE" NOT NULL;

-- AlterTable
ALTER TABLE "MediaHistory" DROP COLUMN "finishedAt",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "finished" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Films";

-- CreateTable
CREATE TABLE "Film" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "originalLanguage" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "watchedCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Film_tmdbId_key" ON "Film"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Film_posterPath_key" ON "Film"("posterPath");

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_id_fkey" FOREIGN KEY ("id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
