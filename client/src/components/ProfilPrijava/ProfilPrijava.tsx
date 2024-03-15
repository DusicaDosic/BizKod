import { Link } from 'react-router-dom';
import './ProfilPrijava.scss';

const UserMenu = () => {
    const korisnikString = sessionStorage.getItem('korisnickoIme');
    const korisnik = korisnikString !== null ? JSON.parse(korisnikString) : null;
  
    const handleLogout = () => {
      sessionStorage.removeItem('korisnickoIme');
      window.location.reload();
    };
  
    return korisnik ? (
        <div className="user-menu">
            <img className="imgKorisnik" src="Slike/korisnik.png" alt="korisnik" />
            <ul id="meni">
            <li>{korisnik}</li>
            <li><Link to="/StranicaPrijava" onClick={handleLogout}>Odjava</Link></li>
            </ul>
        </div>
            ) : (
        <div className="user-menu">
            <div className="dugmad">
            <button className="Registracija"><Link to="/StranicaRegistracija">Registruj se</Link></button>
            <button className="Prijava"><Link to="/StranicaPrijava">Prijavi se</Link></button>
            </div>
        </div>
    );
  };
export default UserMenu;
  