import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Prijava.scss';
import axios from "axios";
import * as yup from 'yup';

interface Klijent {
  korisnickoImeKlij: string;
  lozinkaKlij: string;
}

const Prijava = () => {
  const [prijUnetoKI, setPrijUnetoKI] = useState('');
  const [prijLozinka, setPrijLozinka] = useState('');
  const [klijenti, setKlijenti] = useState<Klijent[]>([]);


  useEffect(() => {
    axios.get("http://localhost:3001/klijent").then((response) => {
      setKlijenti(response.data);
    });
  }, []);

  const schema = yup.object().shape({
    korisnickoImeKlij: yup.string().required('Niste uneli korisničko ime'),
    lozinkaKlij: yup.string().required('Niste uneli lozinku').min(8, 'Lozinka mora sadržati najmanje 8 karaktera'),
  });

  const handlePrijava = async (event: React.FormEvent) => {
        event.preventDefault();   
    try {
        await schema.validate({
        korisnickoImeKlij: prijUnetoKI,
        lozinkaKlij: prijLozinka,
        }, { abortEarly: false });

        const foundUser = klijenti.find(klijent => klijent.korisnickoImeKlij === prijUnetoKI && klijent.lozinkaKlij === prijLozinka);
        if (foundUser) {
            sessionStorage.setItem('korisnickoIme', JSON.stringify(foundUser.korisnickoImeKlij));
            alert('Uspešno ste se prijavili');
        } else {
            alert('Pogrešno korisničko ime ili lozinka');
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
     <form id="prijava">
      <h1>PRIJAVA</h1>

        <label htmlFor="korisnickoIme">Korisničko ime:</label>
        <input type="text" className="korisnickoIme" name="korisnickoIme" required value={prijUnetoKI} onChange={(e) => setPrijUnetoKI(e.target.value)}/>

        <label htmlFor="lozinka">Lozinka:</label>
        <input type="password" className="lozinka" name="lozinka" required value={prijLozinka} onChange={(e) => setPrijLozinka(e.target.value)}/>

        <div id="prijavaReg">
            <button id="prijavise" onClick={handlePrijava}>
                Prijavi se
            </button>
            <p>Nemate nalog?</p>
            <NavLink to="/stranicaRegistracija" className={({ isActive }) => (isActive ? "link-active" : "link")}>Registruj se</NavLink>
        </div>
    </form>
    )
}

export default Prijava;