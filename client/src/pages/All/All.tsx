import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Card from "../../components/Card/Card";

import "../../util/constants";

import "./All.scss";
import Banner from "../../components/Baner/Baner";

interface stan {
    cena: any,
    kvadratura: number,
    id: string,
    brSoba: number,
    opis: string,
    download_url: string,
    maxBr: number,
    cimer: number,
    pol: number,
    pusenje: number,
    ljubimci: number,
    klijentId:number
}

const All = () => {

    const [stanData, setStanData] = useState<stan[]>([]);
    const location = useLocation();
    const pathName = location.pathname;
    const extraClassName = pathName === '/all' ? '-all' : '';
  

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
                            max_br={data.maxBr}
                            cimer={data.cimer}
                            pol={data.pol}
                            pusenje={data.pusenje}
                            KlijentId={data.klijentId}
                            /* onClick={() => addToFavorites(data.id, data.download_url, data.author) */
                        />
                    ))}
                </div>
            </div >
        </>
    );
}

export default All;
