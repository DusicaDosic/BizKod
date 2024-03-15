import './Registrovanje.scss';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import * as yup from 'yup';
import { NavLink } from "react-router-dom";

interface Klijent {
  korisnickoImeKlij: string;
  lozinkaKlij: string;
  imeKlij: string | null;
  prezimeKlij: string | null;
  imejlKlij: string;
}

const Registrovanje = () => {
  const [klijenti, setKlijenti] = useState<Klijent[]>([]);
  const [unetoKI, setUnetoKI] = useState<string>('');
  const [lozinka, setLozinka] = useState<string>('');
  const [imejl, setImejl] = useState<string>('');
  const [ime, setIme] = useState<string>('');
  const [prezime, setPrezime] = useState<string>('');

  useEffect(() => {
    axios.get("http://localhost:3001/klijent").then((response) => {
      setKlijenti(response.data);
    });
  }, []);

  const schema = yup.object().shape({
    korisnickoImeKlij: yup.string().required('Korisničko ime je obavezno polje'),
    lozinkaKlij: yup.string().required('Lozinka je obavezno polje').min(8, 'Lozinka mora sadržati najmanje 8 karaktera'),
    imejlKlij: yup.string().email('Unesite validnu email adresu').required('Email je obavezno polje'),
  });

  const handleRegistracija = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await schema.validate({
        korisnickoImeKlij: unetoKI,
        lozinkaKlij: lozinka,
        imejlKlij: imejl,
      }, { abortEarly: false });

      const korisnickaImena = klijenti.map(klijent => klijent.korisnickoImeKlij);
      if (korisnickaImena.includes(unetoKI)) {
        alert('Korisničko ime je zauzeto');
        return;
      }

      const klijentData = {
        korisnickoImeKlij: unetoKI,
        lozinkaKlij: lozinka,
        imeKlij: ime,
        prezimeKlij: prezime,
        imejlKlij: imejl,
      };

      const response = await axios.post('http://localhost:3001/klijent', klijentData);
      if (response.status === 200) {
        sessionStorage.setItem('korisnickoIme', JSON.stringify(klijentData.korisnickoImeKlij));
        alert('Uspešno ste registrovali klijenta!');
      } else {
        alert('Došlo je do greške prilikom registracije.');
      }
    } catch (error) {
      console.error('Greška prilikom validacije ili slanja zahteva:', error);
      if (error instanceof yup.ValidationError) {
        const errorMessages = error.errors.join('\n');
        alert(`Greška prilikom validacije:\n${errorMessages}`);
      } else {
        alert('Došlo je do greške prilikom slanja zahteva.');
      }
    } finally {
        window.location.reload();
    }
  };

  return (
    <form id="registrovanje">
      <h1>REGISTRACIJA</h1>

      <label htmlFor="korisnickoIme">Korisničko ime:</label>
      <div className="reg">
        <input type="text" className="korisnickoIme" name="korisnickoIme" required value={unetoKI} onChange={(e) => setUnetoKI(e.target.value)} />
        <span className="obavezno">*</span>
      </div>

      <label htmlFor="lozinka">Lozinka:</label>
      <div className="reg">
        <input type="password" className="lozinka" name="lozinka" required value={lozinka} onChange={(e) => setLozinka(e.target.value)}/>
        <span className="obavezno">*</span>
      </div>

      <label htmlFor="firstName" >Ime:</label>
      <input type="text" id="firstName" name="firstName" value={ime} onChange={(e) => setIme(e.target.value)} />

      <label htmlFor="lastName">Prezime:</label>
      <input type="text" id="lastName" name="lastName" value={prezime} onChange={(e) => setPrezime(e.target.value)} />

      <label htmlFor="email">E-mail:</label>
      <div className="reg">
        <input type="email" id="email" name="email" required value={imejl} onChange={(e) => setImejl(e.target.value)}/>
        <span className="obavezno">*</span>
      </div>
      <button id="registrujse" onClick={handleRegistracija}>
        Registruj se
      </button>
      <div id="regPrijava">
        <p>Imate nalog?</p>
        <NavLink to="/stranicaPrijava" className={({ isActive }) => (isActive ? "link-active" : "link")}>Prijavi se</NavLink>
      </div>
    </form>
  );
}

export default Registrovanje;
