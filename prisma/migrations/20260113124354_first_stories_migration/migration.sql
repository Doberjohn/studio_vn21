-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "desktopCoverImage" TEXT,
    "featuredCoverImage" TEXT,
    "publishDate" TIMESTAMP(3) NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryGenre" (
    "storyId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "StoryGenre_pkey" PRIMARY KEY ("storyId","genreId")
);

-- CreateTable
CREATE TABLE "StoryCollection" (
    "storyId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "StoryCollection_pkey" PRIMARY KEY ("storyId","collectionId")
);

-- CreateIndex
CREATE INDEX "Story_featured_idx" ON "Story"("featured");

-- CreateIndex
CREATE INDEX "Story_publishDate_idx" ON "Story"("publishDate");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- AddForeignKey
ALTER TABLE "StoryGenre" ADD CONSTRAINT "StoryGenre_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryGenre" ADD CONSTRAINT "StoryGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryCollection" ADD CONSTRAINT "StoryCollection_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryCollection" ADD CONSTRAINT "StoryCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
