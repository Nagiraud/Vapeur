const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();
const PORT = 3008;

const hbs = require("hbs");
const path = require('path');

// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)

// On définit un middleware pour parser les données des requêtes entrantes.
// Cela permet de récupérer les données envoyées via des formulaires et les rendre disponibles dans req.body.
app.use(bodyParser.urlencoded({ extended: true }));



// gère l'appel de la racine et renvoie a l'acceuil
app.get("/", async (req, res) => {
    
    res.render("index");
});


//JEUX
//Récupere toute les donnée de la tables Games  et l'affiche
app.get("/games", async (req, res) => {
    const games = await prisma.games.findMany();
    res.render("games/index",{games});
});


//vers la pages d'ajout d'un jeu
app.get("/games/new", async (req, res) => {
    const genre = await prisma.genres.findMany();
    const editor = await prisma.editors.findMany();
    res.render("games/new", {genre,editor,});
});

//ajout de donnée dans la table Games
app.post("/games/new", async (req, res) => {
    const { title, description, releaseDate, id_Genre, id_Editor } = req.body;
    try {
        await prisma.games.create({
            data: {
                title,
                description,
                ReleaseDate: releaseDate,
                id_Genre: parseInt(id_Genre),
                id_Editor: parseInt(id_Editor),
              },
        }); // Ici on ne stock pas le retour de la requête, mais on attend quand même son exécution
        res.status(201).redirect("/games"); // On redirige vers la page des tâches
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Task creation failed" });
    }
});

//page de détail d'un jeux
app.get("/games/:id", async (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = await prisma.games.findUnique({
        where: { id: gameId },
        
        include: {
          Genres: true, // Relation pour le genre
          Editors: true, // Relation pour l'éditeur
        },
      });
    res.render("games/detail",{game});
});

app.put("/games/:id", async (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = await prisma.games.findUnique({
        where: { id: gameId },
        
        include: {
          Genres: true, // Relation pour le genre
          Editors: true, // Relation pour l'éditeur
        },
      });
    res.render("games/modify",{game});
});



// EDITEURS
// affiche les editeurs
app.get("/editors" , async (req, res) =>{
    const editors = await prisma.editors.findMany();
    res.render("editors/index",{editors});
})

//page d'ajout d'un editeur
app.get("/editors/new" , async(req,res) =>{
    res.render("editors/new")
})

//ajout d'un editeur dans la table Editor
app.post("/editors/new" , async(req,res) =>{
    const DataEditor = req.body;
    try{
        await prisma.editors.create({
            data: DataEditor,
        });
        res.status(201).redirect("/editors");
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Task creation failed"});
    }
})

app.get("/editors/:id", async (req, res) => {
    const genreEd = parseInt(req.params.id);
    const editor = await prisma.editors.findUnique({
        where: { id: genreEd },
        include: {
          Game: true,
        },
      });
    res.render("editors/detail",{editor});
});



// GENRES
// affiche les genres
app.get("/genres", async (req, res) => {
    const genre = await prisma.genres.findMany();
    res.render("genres",{genre});
});

//page de détail d'un jeux
app.get("/genres/:id", async (req, res) => {
    const genreId = parseInt(req.params.id);
    const genre = await prisma.genres.findUnique({
        where: { id: genreId },
        include: {
          Game: true,
        },
      });
    res.render("genres/detail",{genre});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//TEMP

//pour ajouter les genre dans la base

/*const genre = {
    name: "MMORPG",
};

await prisma.genres.create({
    data: genre,
})*/