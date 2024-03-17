import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import './Registrovanje.scss';
import axios from "axios";
import { NavLink } from "react-router-dom";

interface Klijent {
  author: string;
  prezimeKlij: string;
  imejlKlij: string;
  polKlijenta: number;
  lozinka: string;
  datRodjenja: Date;
}

const Registrovanje = () => {
  const [klijenti, setKlijenti] = useState<Klijent[]>([]);
  const [lozinka, setLozinka] = useState<string>('');
  const [lozinkaConfirm, setLozinkaConfirm] = useState<string>('');
  const [imejl, setImejl] = useState<string>('');
  const [ime, setIme] = useState<string>('');
  const [prezime, setPrezime] = useState<string>('');
  const [pol, setPol] = useState<number>(0);
  const [datRodjenja, setDatRodjenja] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    axios.get("http://localhost:3001/klijent").then((response) => {
      setKlijenti(response.data);
    });
  }, []);

  const osamnaestGodina = new Date();
  osamnaestGodina.setFullYear(osamnaestGodina.getFullYear() - 18);

  const schema = Yup.object().shape({
    imeVal: Yup.string().required('Ime je obavezno'),
    prezimeVal: Yup.string().required('Prezime je obavezno'),
    imejlVal: Yup.string().email('Neispravan email').required('Email je obavezan'),
    lozinkaVal: Yup.string().required('Lozinka je obavezno polje').min(8, 'Lozinka mora sadržati najmanje 8 karaktera'),
    datumRodjenjaVal: Yup.date().required('Datum rođenja je obavezan').max(osamnaestGodina, 'Morate biti stariji od 18 godina'),
    confirmLozinkeVal: Yup.string()
      .oneOf([Yup.ref('lozinkaVal')], 'Lozinke se ne poklapaju')
      .required('Potvrda lozinke je obavezna'),
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDatRodjenja(e.target.value);
    }
  };


  const handleRegistracija = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await schema.validate({
        imeVal: ime,
        prezimeVal: prezime,
        imejlVal: imejl,
        lozinkaVal: lozinka,
        datumRodjenjaVal: datRodjenja,
        confirmLozinkeVal: lozinkaConfirm,
      }, { abortEarly: false });

      const korisnickiImejl = klijenti.map(klijent => klijent.imejlKlij);

      if (korisnickiImejl.includes(imejl)) {
        alert('Postoji nalog sa unetim imejlom');
        return;
      }

      const klijentData = {
        author: ime,
        prezimeKlij: prezime,
        imejlKlij: imejl,
        polKlijenta: pol,
        lozinkaKlij: lozinkaConfirm,
        datRodjenja: datRodjenja,
      };

      const response = await axios.post('http://localhost:3001/klijent', klijentData);
      if (response.status === 200) {
        sessionStorage.setItem('imejl', JSON.stringify(klijentData.imejlKlij));
        alert('Uspešno ste registrovali klijenta!');
      } else {
        alert('Došlo je do greške prilikom registracije.');
      }
    } catch (error) {
      console.error('Greška prilikom validacije ili slanja zahteva:', error);
      if (error instanceof Yup.ValidationError) {
        const errorMessages = error.errors.join('\n');
        alert(`Greška prilikom validacije:\n${errorMessages}`);
      } else {
        alert('Došlo je do greške prilikom slanja zahteva.');
      }
    } finally {
      //     window.location.reload();
    }
  };


  return (
    <div className='pageContainer'>
      <div className='form-container'>
        <form id="registrovanje">

          <div className='red'>
            <label htmlFor="firstName" >Ime:</label>
            <input type="text" id="firstName" name="firstName" value={ime} onChange={(e) => setIme(e.target.value)} />
          </div>

          <div className='red'>
            <label htmlFor="lastName">Prezime:</label>
            <input type="text" id="lastName" name="lastName" value={prezime} onChange={(e) => setPrezime(e.target.value)} />
          </div>

          <div className='red'>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" required value={imejl} onChange={(e) => setImejl(e.target.value)} />
          </div>

          <div className='red'>
            <label htmlFor="gender-select">Izaberite pol:</label>
            <select id="gender-select" value={pol.toString()} onChange={(e) => setPol(Number(e.target.value))}>
              <option value="0">Muško</option>
              <option value="1">Žensko</option>
            </select>
          </div>

          <div className='red'>
            <label htmlFor="lozinka">Lozinka:</label>
            <input type="password" className="lozinka" name="lozinka" required value={lozinka} onChange={(e) => setLozinka(e.target.value)} />
          </div>

          <div className='red'>
            <label htmlFor="lozinkaConfirm">Potvrdite lozinku:</label>
            <input type="password" className="lozinka" name="lozinka" required value={lozinkaConfirm} onChange={(e) => setLozinkaConfirm(e.target.value)} />
          </div>

          <div className='red'>
            <label htmlFor="date-input">Datum rođenja:</label>
            <input
              type="date"
              id="date-input"
              value={datRodjenja}
              onChange={handleDateChange}
            />
          </div>

          <div className='red' id='registracijaBtn'>
            <button id="registrujse" onClick={handleRegistracija}>
              Registruj se
            </button>
          </div>

          <div className='red' id='regPrijava'>
            <p>Imate nalog?</p>
            <NavLink to="/stranicaPrijava" className={({ isActive }) => (isActive ? "link-active" : "link")}>Prijavi se</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registrovanje;