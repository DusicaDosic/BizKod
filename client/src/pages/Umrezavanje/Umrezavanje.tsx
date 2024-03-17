import React, { useState } from 'react';
import './Umrezavanje.scss';

interface Lobi {
    id: number;
    pol: number;
    pusenje: number;
    kucniLjubimac: number;
    godineOd: number;
    godineDo: number;
}

interface LobiKorisnik {
    KlijentId: number;
    LobiId: number;
}

const Umrezavanje = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [preferences, setPreferences] = useState<Lobi>({
        id: 0,
        pol: 0,
        pusenje: 0,
        kucniLjubimac: 0,
        godineOd: 18,
        godineDo: 99,
    });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const handlePreferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPreferences(prevPreferences => ({
            ...prevPreferences,
            [name]: parseInt(value)
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Preferencije:', preferences);
        closeModal();
    };

    return (
        <div className='page-container'>
            {/* Ovo je delimično prozirna pozadina koja pokriva ceo ekran */}
            {modalIsOpen && (
                <div className="modal-background" onClick={handleBackgroundClick}>
                    {/* Modal */}
                    <div className="modal-content">
                        <h2>Odaberite svoje preferencije</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <p>Pol:</p>
                                <select name="pol" value={preferences.pol}>
                                    <option value={0}>Muško</option>
                                    <option value={1}>Žensko</option>
                                    <option value={2}>Svejedno</option>
                                </select>
                            </label>
                            <label>
                                <p>Dozvoljeno pušenje:</p>
                                <select name="pusenje" value={preferences.pusenje}>
                                    <option value={0}>Ne</option>
                                    <option value={1}>Da</option>
                                </select>
                            </label>
                            <label>
                                <p>Dozvoljeni kućni ljubimci:</p>
                                <select name="kucniLjubimac" value={preferences.kucniLjubimac} >
                                    <option value={0}>Ne</option>
                                    <option value={1}>Da</option>
                                </select>
                            </label>
                            <button type="submit">Potvrdi</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Slika koja otvara modal */}
            <div className='picture-container'>
                <img src="../../../public/images/dodaj.png" alt="Opis slike" onClick={openModal} />
            </div>
        </div>
    );
};

export default Umrezavanje;
