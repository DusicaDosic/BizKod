import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMore } from 'react-icons/ai';
import axios from 'axios';
import swal from 'sweetalert';
import PictureMenu from '../PictureMenu/PictureMenu';
import './Card.scss';

interface CardProps {
    id: string;
    cena: string;
    opis: string;
    kvadratura: number;
    brSoba: number;
    download_url: string;
    max_br: number;
    cimer: number;
    pol: number;
    pusenje: number;
    KlijentId: number;
    onClick: (id: string, download_url: string) => void;
}

const Card = ({ id, cena, opis, kvadratura, brSoba, download_url, max_br, cimer, pol, pusenje, KlijentId, onClick }: CardProps) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const handleLike = () => {
        const currentFavourites: CardProps[] = JSON.parse(localStorage.getItem('favourites') || '[]');
        onClick(id, download_url);
        if (currentFavourites.length < 5) {
            setIsLiked(!isLiked);
            localStorage.setItem(`liked_${id}`, JSON.stringify(!isLiked));
        } else if (currentFavourites.length > 4 && !isLiked) {
            swal('It is only possible to like 5 pictures.');
        } else {
            setIsLiked(false);
            localStorage.setItem(`liked_${id}`, JSON.stringify(false));
        }
    };

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="card">
            <header className="cardHeader">
                <div onClick={handleLike} className="cardHeaderHeartIcon">
                    {isLiked ? <AiFillHeart color="#f79428" size="25px" /> : <AiOutlineHeart size="25px" />}
                </div>
                <div className="cardHeaderIcon" onClick={handleMenuToggle}>
                    <AiOutlineMore size="25px" />
                </div>
            </header>
            <img className="imageMapped" src={download_url} alt="Stan" />
            <footer className="cardFooter">
                <p>Cena: {cena}</p>
                <p>Opis: {opis}</p>
                <p>Kvadratura: {kvadratura}</p>
                <p>Broj soba: {brSoba}</p>
                <p>Max br stanara: {max_br}</p>
                <p>Cimer: {cimer}</p>
                <p>Pol: {pol}</p>
                <p>Pušenje: {pusenje}</p>
            </footer>
        </div>
    );
};

export default Card;
