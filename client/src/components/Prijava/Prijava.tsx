import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './Prijava.scss';
import axios from "axios";
import * as yup from 'yup';

interface Klijent {
  imejlKlij: string;
  lozinkaKlij: string;
}

const Prijava = () => {
  const [unetImejl, setUnetImejl] = useState('');
  const [prijLozinka, setPrijLozinka] = useState('');
  const [klijenti, setKlijenti] = useState<Klijent[]>([]);


  useEffect(() => {
    axios.get("http://localhost:3001/klijent").then((response) => {
      setKlijenti(response.data);
    });
  }, []);

  const schema = yup.object().shape({
    imejlKlijenta: yup.string().required('Niste uneli korisničko ime'),
    lozinkaKlij: yup.string().required('Niste uneli lozinku').min(8, 'Lozinka mora sadržati najmanje 8 karaktera'),
  });

  const handlePrijava = async (event: React.FormEvent) => {
        event.preventDefault();   
    try {
        await schema.validate({
        imejlKlijenta: unetImejl,
        lozinkaKlij: prijLozinka,
        }, { abortEarly: false });

        const foundUser = klijenti.find(klijent => klijent.imejlKlij === unetImejl && klijent.lozinkaKlij === prijLozinka);
        if (foundUser) {
            sessionStorage.setItem('imejl', JSON.stringify(foundUser.imejlKlij));
            alert('Uspešno ste se prijavili');
            window.location.reload();
        } else {
            alert('Pogrešan imejl ili lozinka');
        }

    } catch (error) {
            console.error('Greška prilikom validacije ili slanja zahteva:', error);
            if (error instanceof yup.ValidationError) {
                const errorMessages = error.errors.join('\n');
                alert(`Greška prilikom validacije:\n${errorMessages}`);
            } else {
                alert('Došlo je do greške prilikom slanja zahteva.');
            }
        } 
    };

    return (
     <form id="prijava">
      <h1>PRIJAVA</h1>

        <label htmlFor="imejl">E-mail:</label>
        <input type="text" className="imejl" name="imejl" required value={unetImejl} onChange={(e) => setUnetImejl(e.target.value)}/>

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