-- AlterTable
ALTER TABLE "Collection"
    ADD COLUMN "isVisible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Genre"
    ADD COLUMN "isVisible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Story"
    ADD COLUMN "isVisible" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "Collection_isVisible_idx" ON "Collection" ("isVisible");

-- CreateIndex
CREATE INDEX "Genre_isVisible_idx" ON "Genre" ("isVisible");

-- CreateIndex
CREATE INDEX "Story_isVisible_idx" ON "Story" ("isVisible");
