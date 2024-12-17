
//Initialisation
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();

const PORT = 3008;

const hbs = require("hbs");
const path = require('path');
const {error} = require("console");

// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); 
app.set("views", path.join(__dirname, "views")); 
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(express.static("public"));

// On définit un middleware pour parser les données des requêtes entrantes.
// Cela permet de récupérer les données envoyées via des formulaires et les rendre disponibles dans req.body.
app.use(bodyParser.urlencoded({ extended: true }));


//Création des donnée dans la base
const {InsertData} = require("./init/initDB");
InsertData() ;

// gère l'appel de la racine et renvoie a l'acceuil
app.get("/", async (req, res) => {

    const gamesHighlight = await prisma.games.findMany({
        where:{
            highlight : true,
        }
    });
    const game = await prisma.games.findMany({
        take: 5,
      });
    res.render("index",{gamesHighlight,game});


});

//inclure les routes
const router = require("./router/route");
app.use("/",router.router);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});