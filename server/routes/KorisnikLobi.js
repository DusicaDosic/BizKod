const express = require('express');
const router = express.Router();
const { KorisnikLobi } = require("../models");

router.get("/", async(req, res) => {
    const listOfKorisnici = await KorisnikLobi.findAll();
    res.json(listOfKorisnici);
});

router.post("/", async (req, res) => {
    const korisnici = req.body;
    await Klijent.create(korisnici);
    res.json(korisnici);
});

module.exports = router