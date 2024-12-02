-- CreateTable
CREATE TABLE "Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ReleaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Genre" INTEGER NOT NULL,
    "Editor" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Editors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
