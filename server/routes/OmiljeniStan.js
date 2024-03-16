const express = require('express');
const router = express.Router();
const { OmiljeniStan } = require("../models");

router.get("/", async(req, res) => {
    const listOfOmiljeniStanovi = await OmiljeniStan.findAll();
    res.json(listOfOmiljeniStanovi);
});

router.post("/", async (req, res) => {
    const omiljeniStanovi = req.body;
    await Klijent.create(omiljeniStanovi);
    res.json(omiljeniStanovi);
});

module.exports = router