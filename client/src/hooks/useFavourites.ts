import { useState } from "react";
import { handleAddToFavourite } from "../util/index";

interface FavoriteItem {
  id: string;
  author: string;
  download_url: string;
}

const useFavourites = () => {
  const [favourites, setFavourites] = useState<FavoriteItem[]>(
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  const addToFavorites = (id: string, author: string, download_url: string) => {
    const currentFavourites: FavoriteItem[] = JSON.parse(
      localStorage.getItem("favourites") || "[]"
    );

    const updatedFavourites: FavoriteItem[] = handleAddToFavourite(
      id,
      author,
      download_url,
      currentFavourites
    );

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return { favourites, addToFavorites };
};

export default useFavourites;
