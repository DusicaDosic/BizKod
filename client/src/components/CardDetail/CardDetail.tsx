import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Range } from 'react-range';
import axios from 'axios';
import { handleAddToFavourite } from '../../util';
import { AiFillHeart, AiOutlineArrowRight, AiOutlineClose, AiOutlineHeart, AiOutlineMore } from 'react-icons/ai';
import Footer from '../Footer/Footer';
import useFavorites from '../../hooks/useFavourites';
import PictureMenu from '../PictureMenu/PictureMenu';
import swal from 'sweetalert';
import './CardDetail.scss';
import Header from '../Header/Header';


interface Image {
    id: string;
    author: string;
    download_url: string;
    isLiked: boolean;
    onClose?: () => void;
    onNext?: () => void;
    isOpen: boolean;
    isCustomized?: boolean;
}

const CardDetail = ({ id, download_url, author, isLiked, onClose, isOpen, onNext, isCustomized = false }: Image) => {
    const [liked, setLiked] = useState<boolean>(isLiked);
    const { addToFavorites } = useFavorites();
    const [grayscale, setGrayscale] = useState<boolean>(false);
    const [blur, setBlur] = useState<number>(3);
    const [customizedImageUrl, setCustomizedImageUrl] = useState<string>(download_url);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showCustomize, setShowCustomize] = useState<boolean>(isCustomized);
    const [originalWidth, setOriginalWidth] = useState<number | null>(null);
    const [originalHeight, setOriginalHeight] = useState<number | null>(null);
    const navigate = useNavigate();

    const fetchOriginalImage = () => {
        axios
            .get(download_url, {
                responseType: "blob",
            })
            .then((response) => {
                const photoUrl = URL.createObjectURL(response.data);
                const img = new Image();
                img.src = photoUrl;
                img.onload = () => {
                    setOriginalWidth(img.width);
                    setOriginalHeight(img.height);
                };
            })
            .catch((error) => {
                console.error("Error downloading the photo:", error);
            });
    };

    useEffect(() => {
        fetchOriginalImage();
        setShowCustomize(isCustomized)
    }, [isOpen, author]);

    useEffect(() => {
        setLiked(isLiked)
    }, [isLiked]);

    useEffect(() => {
        if (originalWidth !== null && originalHeight !== null) {
            setGrayscale(false);
            setBlur(1);
        }
    }, [originalWidth, originalHeight]);

    const handleGrayscaleChange = () => {
        setGrayscale(!grayscale);
        updateCustomizedImageUrl(!grayscale, blur);
    };

    const handleBlurChange = (values: number[]) => {
        setBlur(values[0]);
        updateCustomizedImageUrl(grayscale, values[0]);
    };

    const updateCustomizedImageUrl = (grayscaleValue: boolean, blurValue: number) => {
        const customizedUrl = `https://picsum.photos/id/${id}/${originalWidth}/${originalHeight}?${grayscaleValue ? 'grayscale&' : ''}blur=${blurValue}`;
        setCustomizedImageUrl(customizedUrl);
    };

    const handleLike = () => {
        const currentFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
        handleAddToFavourite(id, author, download_url, currentFavourites)
        if (currentFavourites.length < 5) {
            setLiked(!liked);
            localStorage.setItem(`liked_${id}`, JSON.stringify(!liked));
        } else if (liked === true) {
            setLiked(false);
            localStorage.setItem(`liked_${id}`, JSON.stringify(false));
        }
        else {
            swal('It is only possible to like 5 photos.')
        }
    };

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
        setShowCustomize(false);
    };

    const handleCustomizeToggle = () => {
        setShowCustomize(!showCustomize);
        if (showCustomize) {
            updateCustomizedImageUrl(grayscale, blur)
        }
        setShowMenu(false);
    };

    useEffect(() => {
        setCustomizedImageUrl(download_url)
        setOriginalHeight(originalHeight)
        setOriginalWidth(originalWidth)
    }, [download_url])

    return (
        isOpen && (
            <div className={`containerDetail ${grayscale ? 'grayscale' : ''}`}>
                <Header />
                <div className="cardDetail">
                    <header className="cardHeaderDetail">
                        <div className="cardHeaderHeartIcon" onClick={() => {
                            handleLike();
                            addToFavorites(id, author, download_url);
                            console.log(id, author, download_url)
                        }}>
                            {liked ? <AiFillHeart color="red" size="25px" /> : <AiOutlineHeart size="25px" />}
                        </div>
                        <div className="cardHeaderIcon" onClick={handleMenuToggle}>
                            <AiOutlineMore size="25px" />
                        </div>
                        {onClose && (
                            <div className="cardHeaderIconClose" onClick={() => {
                                onClose();
                                setBlur(1);
                                setGrayscale(false);
                                setShowCustomize(false);
                                setShowMenu(false);
                                setCustomizedImageUrl(download_url);
                            }}>
                                <AiOutlineClose size="22px" />
                            </div>
                        )}
                        {onNext && (
                            <div className="cardHeaderIconNext" onClick={() => {
                                setLiked(false);
                                onNext();
                                setBlur(1);
                                setGrayscale(false);
                                setShowCustomize(false);
                                setShowMenu(false);
                                // fetchOriginalImage()
                            }}>
                                <AiOutlineArrowRight size="20px" />
                            </div>
                        )}
                    </header>

                    <img className="imageMappedDetail" src={customizedImageUrl} alt="icons" width="70px" />

                    {showMenu && (
                        <PictureMenu
                            download_url={customizedImageUrl}
                            id={id}
                            onCustomize={() => {
                                handleCustomizeToggle();
                            }}
                        />
                    )}

                    {showCustomize && (<>
                        <div className="sliders">
                            <div className='blurSlider'>
                                <span>Blur</span>
                                <Range
                                    step={1}
                                    min={1}
                                    max={10}
                                    values={[blur]}
                                    onChange={handleBlurChange}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '6px',
                                                width: '100%',
                                                backgroundColor: '#ccc',
                                                borderRadius: '3px',
                                            }}
                                        >
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                            {...props}
                                            style={{
                                                ...props.style,
                                                height: '20px',
                                                width: '10px',
                                                backgroundColor: '#fff',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                boxShadow: '0px 2px 6px #AAA',
                                            }}
                                        >
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </>
                    )}

                    <footer className="cardFooterDetail">
                        <p>{author}</p>
                        {showCustomize && <div className='grayscaleToggle'>
                            <div className="toggle-btn-section">
                                <span>Gray</span>
                                <label className={`toggle-checkbox m-vertical-auto`}>
                                    <input
                                        className="toggle-btn__input"
                                        type="checkbox"
                                        name="grayscale-switch"
                                        onChange={handleGrayscaleChange}
                                        checked={grayscale}
                                    />
                                    <span className={`toggle-btn__input-label`} />
                                </label>
                            </div>
                        </div>}
                    </footer>
                </div>
                <Footer />
            </div>

        )
    );
};

export default CardDetail;
