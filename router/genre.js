const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GENRES
// affiche les genres
app.get("/genres", async (req, res) => {
    const genre = await prisma.genres.findMany();
    res.render("genres",{genre});
});

//page de détail d'un jeux
app.get("/:id", async (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = await prisma.genres.findUnique({
        where: { id: genreId },
        include: {
          Game: true,
        },
      });
    res.render("genres/detail",{genre});
});