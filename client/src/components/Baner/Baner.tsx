import React from "react";
import './Baner.scss';

interface BannerProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, backgroundImage }) => {
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
        <div style={bannerStyle}>
            <h1>{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
    );
};

export default Banner;
