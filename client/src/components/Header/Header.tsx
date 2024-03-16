import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { ThemeContext } from '../../contexts/ThemeContext';
import "./Header.scss";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const handleThemeChange = () => {
        const isCurrentDark = theme === 'dark';
        setTheme(isCurrentDark ? 'light' : 'dark');
        localStorage.setItem('theme', isCurrentDark ? 'light' : 'dark');
    };

    return (
        <header className="headerMain">
            <nav>
                <div className="logo">
                    <a href="https://https://www.4zida.rs/">
                        <img src={(theme === 'dark') ? 'images/4zida-darkmode.png' : 'images/deo-inspira-grupe.png'} className="logo" alt="Logo" width="170px" />
                    </a>
                </div>
                <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li id="All">
                            <NavLink to="/all" className={({ isActive }) => (isActive ? "link-active" : "link")}>Sve ponude</NavLink>
                        </li>
                        <li id="Favourite">
                            <NavLink to="/favourite" className={({ isActive }) => (isActive ? "link-active" : "link")}>Omiljeno</NavLink>
                        </li>
                        <li id="Random">
                            <NavLink to="/random" className={({ isActive }) => (isActive ? "link-active" : "link")}>Profil</NavLink>
                        </li>
                        <li>
                            <div className="toggle-btn-section">
                                <div className={`toggle-checkbox m-vertical-auto`}>
                                    <input
                                        className="toggle-btn__input"
                                        type="checkbox"
                                        name="checkbox"
                                        onChange={handleThemeChange}
                                        checked={theme === 'light'}
                                    />
                                    <span>Light/Dark</span>
                                    <button type="button" className={`toggle-btn__input-label`} onClick={handleThemeChange}></button>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
                <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <VscMenu className="Hamburger" size="30px" />
                </div>
            </nav>
        </header>
    )
}

export default Header;

