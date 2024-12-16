const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// EDITEURS
// affiche les editeurs
app.get("/" , async (req, res) =>{
    const editors = await prisma.editors.findMany();
    res.render("editors/index",{editors});
})

//page d'ajout d'un editeur
app.get("/new" , async(req,res) =>{
    res.render("editors/new")
})

//ajout d'un editeur dans la table Editor
app.post("/new" , async(req,res) =>{
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

//modification d'un jeux
app.get("/:id/edit", async (req, res) => {
    const editor = await prisma.editors.findUnique({
        where: { id: parseInt(req.params.id) },
    });
    res.render("editors/modify", {editor});
});

app.get("/:id", async (req, res) => {
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
app.post("/:id", async (req, res) => {
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