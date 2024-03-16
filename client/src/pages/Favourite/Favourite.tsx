import Card from "../../components/Card/Card";
import useFavorites from "../../hooks/useFavourites";
import "./Favourite.scss";

interface FavoriteItem {
    id: string;
    author: string;
    download_url: string;
}

const Favourite = () => {
    const { favourites, addToFavorites } = useFavorites();

    return (
        <div className="pageAllContainer">
            <div className="imageContainer">
                <p className={favourites.length === 0 ? "displayEmpty" : "none"}>
                    Još uvek niste označili da vam se sviđa neka ponuda. <br /> Pretražite ponovo sve ponude.
                </p>
                {favourites.map((favourite: FavoriteItem) => (
                    <Card
                        download_url={favourite.download_url}
                        author={favourite.author}
                        key={favourite.id}
                        id={favourite.id}
                        onClick={() =>
                            addToFavorites(favourite.id, favourite.author, favourite.download_url)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default Favourite;
