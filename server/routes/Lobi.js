const express = require('express');
const router = express.Router();
const { Lobi } = require("../models"); 



router.post('/', async (req, res) => {
    const lobi = req.body;
    await Lobi.create(lobi);
    res.json(lobi);
});

// Dohvatanje svih lobija za određeni stan
router.get('/', async (req, res) => {
    try {
      const stanId = req.query.stanId;
      if (!stanId) {
        return res.status(400).send({ message: 'Stan ID je obavezan parametar.' });
      }

      const lobiji = await Lobi.findAll({
        where: { StanId: stanId },
        include: [{
          model: KorisnikLobi,
          as: 'korisniciULobiju' // Ovo 'as' treba da se poklapa sa onim kako ste definisali u asocijacijama modela
        }]
      });

      res.json(lobiji);
    } catch (error) {
      console.error('Došlo je do greške pri dobijanju lobija:', error);
      res.status(500).send({ message: 'Došlo je do greške na serveru.' });
    }
});

module.exports = router;
