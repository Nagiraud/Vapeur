const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

// EDITEURS
// affiche les editeurs
router.get("/" , async (req, res) =>{
    const editors = await prisma.editors.findMany();
    res.render("editors/index",{editors});
})

//page d'ajout d'un editeur
router.get("/new" , async(req,res) =>{
    res.render("editors/new")
})

//ajout d'un editeur dans la table Editor
router.post("/new" , async(req,res) =>{
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

//gère le bouton delete
router.post("/:id/delete", async(req,res)=>{
    try{
    const editorID = parseInt(req.params.id);
    console.log(editorID);
    await prisma.games.deleteMany({
        where:{
            id_Editor: editorID,
        },  
    });
    await prisma.editors.delete({
        where:{
            id: editorID,
        },
    });
    
    console.log("delete complete");
    res.status(201).redirect("/editors");
    }catch{
        console.error(error);
        res.status(400).json({error: "deletion failed"});
    }
    
})


//modification d'un jeux
router.get("/:id/edit", async (req, res) => {
    const editor = await prisma.editors.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    res.render("editors/modify", {editor});
});

router.get("/:id", async (req, res) => {
    const genreId = parseInt(req.params.id);
    const editor = await prisma.editors.findUnique({
        where: { id: genreId },
        include: {
          Game: true,
        },
      });
    res.render("editors/detail",{editor});
});


//modify editor
router.post("/:id", async (req, res) => {
    const editorId = parseInt(req.params.id);
    const { name } = req.body;
try{
    const updatedEditors = await prisma.editors.update({
            where: {
                id: editorId, 
            },
            data: {
                name,
            },
        });
        res.status(201).redirect("/editors");
    }catch (error){
        console.error(error);
        res.status(400).json({ error: "editor update failed" });
    }
});

module.exports = {
    router,
}