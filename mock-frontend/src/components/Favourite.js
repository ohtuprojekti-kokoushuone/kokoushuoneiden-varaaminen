import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Button } from 'semantic-ui-react';

const Favourite = ({ room }) => {
  return <SetStateAndToggle room={room} />;
};

const SetStateAndToggle = () => {
  const [favourite, setFavourite] = useState(false);

  function useFavourites() {
    const [favourites, setFavourites] = useState(() => {
      const ls = localStorage.getItem('favourites');
      if (ls) return JSON.parse(ls);
      else return [];
    });

    const toggleItemInLocalStorage = (id) => () => {
      const isFavourited = favourites.includes(id);
      if (isFavourited) setFavourites((prev) => prev.filter((b) => b !== id));
      else setFavourites((prev) => [...prev, id]);
    };
    useEffect(() => {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    return [favourites, toggleItemInLocalStorage];
  }

  const [favs, toggleFav] = useFavourites();

  const favouriteClass = 'favourite';

  const isNotFavourite = <FaRegHeart className={favouriteClass} />;
  const isFavourite = <FaHeart className={favouriteClass} />;

  /*
  const toggleFavourite = () => {
    setFavourite((favourite) => {
      if (favourite === true) {
        /* TODO: update the change
      }

      if (favourite === false) {
        /* TODO: update the change
      }
      return !favourite;
    });
  };
  */

  return (
    <Button size="medium" onClick={toggleFav} className={favouriteClass}>
      {favourite === true ? isFavourite : isNotFavourite}
    </Button>
  );
};

export default Favourite;
