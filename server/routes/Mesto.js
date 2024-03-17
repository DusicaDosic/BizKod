const express = require('express');
const router = express.Router();
const { Mesto } = require("../models");

router.get("/", async(req, res) => {
    const listOfMesta = await Mesto.findAll();
    res.json(listOfMesta);
});

router.post("/", async (req, res) => {
    const mesta = req.body;
    await Mesto.create(mesta);
    res.json(mesta);
});

module.exports = router