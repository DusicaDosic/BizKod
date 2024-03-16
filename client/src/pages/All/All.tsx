import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import "../../util/constants"
import useFavorites from "../../hooks/useFavourites";
import "./All.scss";
import Banner from "../../components/Baner/Baner";
import Registrovanje from "../../components/Registrovanje/Registrovanje";

interface ImageData {
    id: string;
    author: string;
    download_url: string;
}

const All = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [images, setImages] = useState<ImageData[]>([]);
    const location = useLocation();
    const pathName = location.pathname;
    const extraClassName = pathName === '/all' ? '-all' : '';
    const { addToFavorites } = useFavorites();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }
    const fetchImages = () => {
        axios
            .get(`v2/list?page=${currentPage + 1}&limit=12`)
            .then((response) => {
                setImages(response.data);
            })
            .catch(() => swal("Error"))
    };
    useEffect(() => {
        fetchImages();
    }, [currentPage]);

    return (
        <>
            <Banner
                title="Pronađite cimera!"
                subtitle="Povoljnije do stana"
                backgroundImage="images/Baner.png"
            />
            <div className={`pageAllContainer-${extraClassName}`}>
                <div className="imageContainer">
                    {images.map((image) => <Card download_url={image.download_url} author={image.author} key={image.id} id={image.id} onClick={() =>
                        addToFavorites(image.id, image.author, image.download_url)
                    } />)}
                </div>
                <Pagination totalPages={75} onPageChange={handlePageChange} />
            </div >
        </>
    );
}

export default All;