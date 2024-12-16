const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();



// GENRES
// affiche les genres
router.get("/", async (req, res) => {
    const genre = await prisma.genres.findMany();
    res.render("genres",{genre});
});

//liste de jeux d'un genre
router.get("/:id", async (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = await prisma.genres.findUnique({
        where: { id: genreId },
        include: {
          Game: true,
        },
      });
    res.render("genres/detail",{genre});
});

module.exports = {
    router,
}