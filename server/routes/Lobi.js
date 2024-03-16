const express = require('express');
const router = express.Router();
const { Lobi } = require("../models");

router.get("/", async(req, res) => {
    const listOfLobiji = await Lobi.findAll();
    res.json(listOfLobiji);
});

router.post("/", async (req, res) => {
    const lobiji = req.body;
    await Lobi.create(lobiji);
    res.json(lobiji);
});

module.exports = router