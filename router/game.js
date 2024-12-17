const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();



//JEUX
//Récupere toute les donnée de la tables Games  et l'affiche
router.get("/", async (req, res) => {
    const games = await prisma.games.findMany();
    res.render("games/index",{games});
});


//vers la pages d'ajout d'un jeu
router.get("/new", async (req, res) => {
    const genre = await prisma.genres.findMany();
    const editor = await prisma.editors.findMany();
    res.render("games/new", {genre,editor,});
});

//ajout de donnée dans la table Games
router.post("/new", async (req, res) => {
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
        res.status(400).json({ error: "adding games failed" });
    }
});

//page de détail d'un jeux
router.get("/:id", async (req, res) => {
    try{
        const gameId = parseInt(req.params.id);
        const game = await prisma.games.findUnique({
            where: { id: gameId },
            
            include: {
            Genres: true, // Relation pour le genre
            Editors: true, // Relation pour l'éditeur
            },
        });
        res.render("games/detail",{game});
    }catch (error){
        console.error(error);
        res.status(400).json({ error: "get games failed" });
    }
   
});


//modification d'un jeux
router.get("/:id/edit", async (req, res) => {
    try{
        const game = await prisma.games.findUnique({
            where: { id: parseInt(req.params.id) },
            include:{
                Genres:true,
                Editors:true,
            }
        });
        const genres = await prisma.genres.findMany();
        const editors = await prisma.editors.findMany();
        res.render("games/modify", {game,genres,editors});
    }catch (error){
        console.error(error);
        res.status(400).json({ error: "modification failed" });
    }
    
});

router.post("/:id", async (req, res) => {
    const gameId = parseInt(req.params.id);
    const { title, description, ReleaseDate, id_Genre, id_Editor } = req.body;
try{
    const updatedGame = await prisma.games.update({
            where: {
                id: gameId, 
            },
            data: {
                title,       
                description,
                ReleaseDate: new Date(ReleaseDate), 
                id_Genre:parseInt(id_Genre),
                id_Editor:parseInt(id_Editor),
            },
        });
        res.status(201).redirect("/games");
    }catch (error){
        console.error(error);
        res.status(400).json({ error: "Task creation failed" });
    }
});

router.post("/:id/delete", async (req, res) => {
    try{
            const deleteGame = await prisma.games.delete({
                where: {
                    id: parseInt(req.params.id),
                },
            })
            res.status(201).redirect("/games");
    } catch(error){
        console.error(error);
        res.status(400).json({ error: "games delete failed" });
    }
});

router.post("/:id/highlight", async(req,res)=>{
    try{
         const highlightGame = await prisma.games.update({
            where:{
                id: parseInt(req.params.id),
            },
            data:{
                highlight : true,
            }
         })
         res.status(201).redirect(req.get("Referer") || "/");
    } catch{
        console.error(error);
        res.status(400).json({ error: "game highlight failed" });
    }
})

router.post("/:id/unhighlight", async(req,res)=>{
    try{
        const unhighlightedGame = await prisma.games.update({
            where:{
                id: parseInt(req.params.id),
            },
            data:{
                highlight: false,
            }
        })
        res.status(201).redirect(req.get("Referer") || "/");
    }catch{
        console.error(error);
        res.status(400).json({ error: "game highlight removal failed" });
    }
})

module.exports = {
    router,
}