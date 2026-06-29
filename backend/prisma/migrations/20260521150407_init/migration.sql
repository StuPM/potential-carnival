-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Films" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "originalLanguage" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "watchedCount" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Films_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaHistory" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "finishedAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "location" TEXT,

    CONSTRAINT "MediaHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Films_tmdbId_key" ON "Films"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Films_posterPath_key" ON "Films"("posterPath");

-- AddForeignKey
ALTER TABLE "Films" ADD CONSTRAINT "Films_id_fkey" FOREIGN KEY ("id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaHistory" ADD CONSTRAINT "MediaHistory_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
