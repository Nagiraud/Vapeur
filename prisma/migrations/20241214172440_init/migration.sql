-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ReleaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_Genre" INTEGER NOT NULL DEFAULT 0,
    "id_Editor" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Games_id_Genre_fkey" FOREIGN KEY ("id_Genre") REFERENCES "Genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Games_id_Editor_fkey" FOREIGN KEY ("id_Editor") REFERENCES "Editors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Games" ("ReleaseDate", "description", "id", "id_Editor", "id_Genre", "title") SELECT "ReleaseDate", "description", "id", "id_Editor", "id_Genre", "title" FROM "Games";
DROP TABLE "Games";
ALTER TABLE "new_Games" RENAME TO "Games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
