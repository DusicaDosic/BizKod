import { AiOutlineDownload, AiOutlineEdit, AiOutlineShareAlt } from 'react-icons/ai';
import { handleDownload, handleShare } from '../../util/index';
import './PictureMenu.scss';

interface PictureMenuProps {
    id: string;
    download_url: string;
    onCustomize: () => void; // Add onCustomize prop here
}

const PictureMenu = ({ download_url, id, onCustomize }: PictureMenuProps) => {
    return (
        <div className="cardMenu">
            <ul>
                <li onClick={() => handleShare(download_url)}>
                    <AiOutlineShareAlt size="20px" />
                    <span>Share</span>
                </li>
            </ul>
        </div>
    );
};

export default PictureMenu;