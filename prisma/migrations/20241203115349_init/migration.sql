-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Editors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Editors" ("id", "name") SELECT "id", "name" FROM "Editors";
DROP TABLE "Editors";
ALTER TABLE "new_Editors" RENAME TO "Editors";
CREATE TABLE "new_Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ReleaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Genre" INTEGER NOT NULL DEFAULT 0,
    "Editor" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Games" ("Editor", "Genre", "ReleaseDate", "description", "id", "title") SELECT "Editor", "Genre", "ReleaseDate", "description", "id", "title" FROM "Games";
DROP TABLE "Games";
ALTER TABLE "new_Games" RENAME TO "Games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
