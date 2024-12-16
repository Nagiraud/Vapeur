const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

const game = require("./game");
const editor = require("./editor");
const genre = require("./genre");

router.use("/games",game.router);
router.use("/editors",editor.router);
router.use("/genres",genre.router);

module.exports = {
    router,
}