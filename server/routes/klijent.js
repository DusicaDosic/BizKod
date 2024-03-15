const express = require('express');
const router = express.Router();
const { Klijent } = require("../models");

router.get("/", async(req, res) => {
    const listOfKlijenti = await Klijent.findAll();
    res.json(listOfKlijenti);
});

router.post("/", async (req, res) => {
    const klijenti = req.body;
    await Klijent.create(klijenti);
    res.json(klijenti);
});

module.exports = router