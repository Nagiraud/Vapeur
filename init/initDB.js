const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();

//ajoute les genres si il n'existe pas dans la base de donnée
async function InsertData() {

    try{

        //Init Genres
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
                where: { id: data.id }, 
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

  module.exports = {
    InsertData,
}