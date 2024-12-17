const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

//importer les fichier contenant les routes de game,editor et genre
const game = require("./game");
const editor = require("./editor");
const genre = require("./genre");

//relier les fichier importer au routes principaux
router.use("/games",game.router);
router.use("/editors",editor.router);
router.use("/genres",genre.router);

//Exporte les objets vers les fichier qui en ont besoin
module.exports = {
    router,
}