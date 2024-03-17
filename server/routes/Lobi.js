const express = require('express');
const router = express.Router();
const { Lobi,KorisnikLobi,Klijent } = require("../models");



router.post('/', async (req, res) => {
    const lobi = req.body;
    await Lobi.create(lobi);
    res.json(lobi);
});
router.post('/korLobi', async (req, res) => {
    const Korlobi = req.body;
    await KorisnikLobi.create(Korlobi);
    res.json(Korlobi);
});

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
          as: 'KorisniciLobija' // Ovo 'as' treba da se poklapa sa onim kako ste definisali u asocijacijama modela
        }]
      });
 
      res.json(lobiji);
    } catch (error) {
      console.error('Došlo je do greške pri dobijanju lobija:', error);
      res.status(500).send({ message: 'Došlo je do greške na serveru.' });
    }
 
 
 
});
 
// Dohvatanje svih klijenata u lobijima za određeni stan
router.get('/klijentiPoStanu', async (req, res) => {
    try {
        const stanId = req.query.stanId;
        if (!stanId) {
          return res.status(400).send({ message: 'Stan ID je obavezan parametar.' });
        }
   
        // Pretpostavljamo da su asocijacije pravilno postavljene
        const lobiji = await Lobi.findAll({
          where: { StanId: stanId },
          include: [{
            model: KorisnikLobi,
            as: 'korisnici', // Ovo 'as' treba da se poklapa sa onim kako ste definisali u asocijacijama modela
          }]
        });
 
      res.json(lobiji);
    } catch (error) {
      console.error('Došlo je do greške pri dobijanju lobija:', error);
      res.status(500).send({ message: 'Došlo je do greške na serveru.' });
    }
});
 

module.exports = router;
