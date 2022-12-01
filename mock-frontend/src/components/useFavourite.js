import { useEffect, useState } from 'react';

function useFavourites() {
  const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem('favourites') || '[]'));

  const toggleItemInLocalStorage = (id) => () => {
    const isFavourited = favourites.includes(id);
    if (isFavourited) {
      setFavourites((favourites) => favourites.filter((savedId) => savedId !== id));
    } else {
      const tempFavourites = [...favourites, id];
      setFavourites(tempFavourites);
    }
  };
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  });

  return [favourites, toggleItemInLocalStorage];
}

export default useFavourites;
