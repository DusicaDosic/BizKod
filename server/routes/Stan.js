const express = require('express');
const router = express.Router();
const { Stan } = require("../models");
 
router.get("/", async(req, res) => {
    const listOfStanovi = await Stan.findAll();
    res.json(listOfStanovi);
});
 
router.post("/", async (req, res) => {
    const stanovi = req.body;
    await Stan.create(stanovi);
    res.json(stanovi);
});
 
module.exports = router