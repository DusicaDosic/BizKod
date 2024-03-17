import React, { useState } from "react";
import './Baner.scss';
import Registrovanje from "../Registrovanje/Registrovanje"; 
import Prijava from "../Prijava/Prijava";

interface BannerProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, backgroundImage }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Stop propagation to prevent modal from closing when clicking inside
    const handleModalContentClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const bannerStyle: React.CSSProperties = {
        color: "white",
        position: "relative",
        top: "80px",
        textAlign: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        height: "400px"
    };

    return (
        <>
            <div style={bannerStyle}>
                <h1>{title}</h1>
                <div className="redBtn">
                    <button className="registracijaBtn" onClick={toggleModal}>Registruj se</button>
                    <button className="prijavaBtn">Prijavi se</button>
                </div>
                {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content" onClick={handleModalContentClick}>
                        <Prijava />
                    </div>
                </div>
            )}
        </>
    );
};

export default Banner;

