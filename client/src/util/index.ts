import axios from "axios";
import swal from "sweetalert";

interface FavoriteItem {
  id: string;
  author: string;
  download_url: string;
}

export const handleAddToFavourite = (
  id: string,
  author: string,
  download_url: string,
  currentFavourites: FavoriteItem[]
): FavoriteItem[] => {
  if (
    !currentFavourites.some((item) => item.id === id) &&
    currentFavourites.length < 5
  ) {
    const updatedFavourites: FavoriteItem[] = [
      ...currentFavourites,
      { id, author, download_url },
    ];
    return updatedFavourites;
  } else {
    const updatedFavourites: FavoriteItem[] = currentFavourites.filter(
      (item) => item.id !== id
    );
    return updatedFavourites;
  }
};

export const handleDownload = (download_url: string, id: string) => {
  axios
    .get(download_url, {
      responseType: "blob",
    })
    .then((response) => {
      const photoUrl = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = photoUrl;
      const filename = `photo_${id}.jpg`;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(photoUrl);
    })
    .catch((error) => {
      console.error("Error downloading the photo:", error);
    });
};

export const handleShare = (download_url: string) => {
  axios
    .get(download_url)
    .then(() => {
      navigator.clipboard.writeText(download_url);
      swal("Link copied to clipboard.");
    })
    .catch((error) => {
      console.error("Error copying the link:", error);
    });
};
