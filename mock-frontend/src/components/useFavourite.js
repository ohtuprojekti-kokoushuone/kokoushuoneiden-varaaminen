import { useEffect, useState } from 'react';
import { getFavourites, updateFavourites } from '../requests';

function useFavourites() {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) => () => {
    const isFavourited = favourites.includes(id);
    if (isFavourited) {
      const removeFavourite = (favourites) => favourites.filter((savedId) => savedId !== id);
      setFavourites(removeFavourite);
      updateFavourites(removeFavourite(favourites));
    } else {
      const tempFavourites = [...favourites, id];
      setFavourites(tempFavourites);
      updateFavourites(tempFavourites);
    }
  };
  useEffect(() => {
    getFavourites().then((data) => {
      setFavourites(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [favourites, toggleFavourite];
}

export default useFavourites;
