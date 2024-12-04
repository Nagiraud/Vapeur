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



//                                                  accueil
app.get("/", async (req, res) => {
    res.render("index");
});

//                                                  /games
//Récupere toute les donnée de la tables Games  et l'affiche
app.get("/games", async (req, res) => {
    const games = await prisma.games.findMany();
    res.render("games/index",{games});
});

app.get("/gamesd/", async (req, res) => {
    const games = await prisma.games.findMany();
    res.render("games/index",{games});
});

//                                                  /games/new
//vers la pages d'ajout d'un jeu
app.get("/games/new", async (req, res) => {
    res.render("games/new");
});

//ajout de donnée dans la table Games
app.post("/games/new", async (req, res) => {
    const DataGame = req.body;
    try {
        await prisma.games.create({
            data: DataGame,
        }); // Ici on ne stock pas le retour de la requête, mais on attend quand même son exécution
        res.status(201).redirect("/games"); // On redirige vers la page des tâches
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Task creation failed" });
    }
});

//                                                  /games/delete
//vers la pages d'ajout d'un jeu
app.delete("/gamesd/", async (req, res) => {
    res.render("games/new");
});

//ajout de donnée dans la table Games
app.delete("/gamesd/", async (req, res) => {
    const DataGame = req.body;
    try {
        await prisma.games.create({
            data: DataGame,
        }); // Ici on ne stock pas le retour de la requête, mais on attend quand même son exécution
        res.status(201).redirect("/games"); // On redirige vers la page des tâches
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Task creation failed" });
    }
});

// Genre
app.get("/genres", async (req, res) => {
    const genre = await prisma.genres.findMany();
    //res.render("games/index",{games});
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