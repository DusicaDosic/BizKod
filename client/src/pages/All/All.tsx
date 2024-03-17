import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import "../../util/constants";
import useFavorites from "../../hooks/useFavourites";
import "./All.scss";
import Banner from "../../components/Baner/Baner";

interface stan {
    cena: number,
    kvadratura: string,
    id: number,
    brSoba: number,
    opis: string,
    download_url: string,
    maxBr: number,
    cimer: boolean,
    pol: number,
    pusenje: boolean,
    ljubimci: boolean,
}

const All = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [stanData, setStanData] = useState<stan[]>([]);
    const location = useLocation();
    const pathName = location.pathname;
    const extraClassName = pathName === '/all' ? '-all' : '';
    const { addToFavorites } = useFavorites();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/stan');
                if (response.data && response.data.length > 0) {
                    setStanData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                swal('Error', 'Failed to fetch data from the server', 'error');
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (
        <>
            <Banner
                title="Pronađite cimera!"
                subtitle="Povoljnije do stana"
                backgroundImage="images/Baner.png"
            />
            <div className={`pageAllContainer-${extraClassName}`}>
                <div className="imageContainer">
                    {stanData.map((data) => (
                        <Card
                            key={data.id}
                            id={data.id}
                            cena={data.cena}
                            opis={data.opis}
                            kvadratura={data.kvadratura}
                            brSoba={data.brSoba}
                            download_url={data.download_url}
                            max_br={data.max_br}
                            cimer={data.cimer}
                            pol={data.pol}
                            pusenje={data.pusenje}
                            KlijentId={data.KlijentId}
                            onClick={() => addToFavorites(data.id, data.download_url, data.author)}
                        />
                    ))}
                </div>
                <Pagination totalPages={75} onPageChange={handlePageChange} />
            </div >
        </>
    );
}

export default All;
