import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import CardDetail from '../../components/CardDetail/CardDetail';
import '../../components/CardDetail/CardDetail.scss'
import Registrovanje from '../../components/Registrovanje/Registrovanje';

interface ImageInfo {
    id: string;
    author: string;
    download_url: string;
}

const Random = () => {
    return (
        <Registrovanje />
    );
};

export default Random;