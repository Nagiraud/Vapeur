/*
  Warnings:

  - You are about to drop the column `Editor` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `Genre` on the `Games` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ReleaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_Genre" INTEGER NOT NULL DEFAULT 0,
    "id_Editor" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Games" ("ReleaseDate", "description", "id", "title") SELECT "ReleaseDate", "description", "id", "title" FROM "Games";
DROP TABLE "Games";
ALTER TABLE "new_Games" RENAME TO "Games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
