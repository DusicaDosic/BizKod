import { useLocation } from "react-router-dom";
import "./Footer.scss"

const Footer = () => {
    const location = useLocation();
    const pathName = location.pathname;
    const extraClassName = pathName === '/favourite' ? 'footer--favourite' : 'footer--all';
    return (
        <footer className={`container-${extraClassName}`}>
            <div className="left"><p>10.07.2023 - 04.08.2023.</p></div>
            <div className="right"><p>Anđelka Matković</p></div>
        </footer>
    )
}

export default Footer;
