const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();
const PORT = 3008;

const hbs = require("hbs");
const path = require('path');
const { error } = require("console");

app.use(express.static("public"));

// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)

// On définit un middleware pour parser les données des requêtes entrantes.
// Cela permet de récupérer les données envoyées via des formulaires et les rendre disponibles dans req.body.
app.use(bodyParser.urlencoded({ extended: true }));

InsertGenres() 

async function InsertGenres() {
    // Données à insérer
    try{
        const dataGenre = [
            { id: 1, name: 'Action'},
            { id: 2, name: 'Aventure' },
            { id: 3, name: 'RPG'},
            { id: 4, name: 'Simulation' },
            { id: 5, name: 'Sport'},
            { id: 6, name: 'MMORPG' },
        ];
    
        for (const data of dataGenre ) {
        const IsExisting = await prisma.genres.findUnique({
            where: { id: data.id }, // Assurez-vous que l'attribut `id` ou autre clé unique existe
        });
    
        if (!IsExisting) {
            await prisma.genres.create({
            data,
            });
        }
        }
    } catch(error){
        console.error(error);
        res.status(400).json({ error: "Failed init database" });
    }
  }

// gère l'appel de la racine et renvoie a l'acceuil
app.get("/", async (req, res) => {

    const gamesHighlight = await prisma.games.findMany({
        where:{
            highlight : true,
        }
    });
    res.render("index",{gamesHighlight});

    

});

//inclure les routes
const router = require("./router/route");
app.use("/",router.router);


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