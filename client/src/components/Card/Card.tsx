import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMore } from 'react-icons/ai';
import swal from 'sweetalert';
import CardDetail from '../CardDetail/CardDetail';
import './Card.scss';
import '../../hooks/useFavourites'
import PictureMenu from '../PictureMenu/PictureMenu';
import useFavourites from '../../hooks/useFavourites';

interface Image {
    id: string;
    author: string;
    download_url: string;
    onClick: (id: string, download_url: string, author: string) => void;
}

const Card = ({ id, author, download_url, onClick }: Image) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [isCustomized, setIsCustomized] = useState<boolean>(false);

    useEffect(() => {
        const data = window.localStorage.getItem(`liked_${id}`);
        if (data !== null) setIsLiked(JSON.parse(data));
    }, [isOpen]);

    const handleLike = () => {
        const currentFavourites: Image[] = JSON.parse(localStorage.getItem('favourites') || '[]');
        onClick(id, author, download_url);
        if (currentFavourites.length < 5) {
            setIsLiked(!isLiked);
            localStorage.setItem(`liked_${id}`, JSON.stringify(!isLiked));
        } else if (currentFavourites.length > 4 && isLiked === false) {
            swal('It is only possible to like 5 pictures.');
        } else {
            setIsLiked(false);
            localStorage.setItem(`liked_${id}`, JSON.stringify(false));
        }
    };

    const handleIsOpen = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = "hidden";
        document.body.style.height = "100%";
    };

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <CardDetail
                id={id}
                download_url={download_url}
                author={author}
                isLiked={isLiked}
                onClose={() => {
                    setIsOpen(false);
                    document.body.style.overflow = "auto";
                    document.body.style.height = "auto";
                }}
                isCustomized={isCustomized}
                isOpen={isOpen}
            />
            <div className="card">
                <header className="cardHeader">
                    <div onClick={handleLike} key={id} className="cardHeaderHeartIcon">
                        {isLiked ? <AiFillHeart color="#f79428" size="25px" /> : <AiOutlineHeart size="25px" />}
                    </div>
                    <div className="cardHeaderIcon" onClick={handleMenuToggle}>
                        <AiOutlineMore size="25px" />
                    </div>
                </header>
                {showMenu && (
                    <div className="cardMenuSmall">
                        <PictureMenu download_url={download_url} id={id} onCustomize={() => {
                            setShowMenu(false)
                            setIsOpen(true);
                            document.body.style.overflow = "hidden";
                            document.body.style.height = "100%";
                            setIsCustomized(true);
                        }} />
                    </div>
                )}
                <img className="imageMapped" src={download_url} key={id} alt="icons" width="70px" onClick={handleIsOpen} />
                <footer className="cardFooter">
                    <p>{author}</p>
                </footer>
            </div>
        </>
    );
};

export default Card;
