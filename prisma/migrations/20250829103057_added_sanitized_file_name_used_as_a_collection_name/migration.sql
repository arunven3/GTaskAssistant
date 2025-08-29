/*
  Warnings:

  - Added the required column `sanitizedName` to the `ChunkingFiles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChunkingFiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "sanitizedName" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ChunkingFiles" ("createdAt", "filename", "id", "path", "size") SELECT "createdAt", "filename", "id", "path", "size" FROM "ChunkingFiles";
DROP TABLE "ChunkingFiles";
ALTER TABLE "new_ChunkingFiles" RENAME TO "ChunkingFiles";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
