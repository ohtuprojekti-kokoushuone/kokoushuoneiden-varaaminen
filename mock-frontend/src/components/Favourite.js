import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Button } from 'semantic-ui-react';

const Favourite = () => {
  return <SetStateAndToggle />;
};

const SetStateAndToggle = () => {
  const [favourite, setFavourite] = useState(false);

  const favouriteClass = 'favourite';

  const isNotFavourite = <FaRegHeart className={favouriteClass} />;
  const isFavourite = <FaHeart className={favouriteClass} />;

  const toggleFavourite = () => {
    setFavourite((favourite) => {
      if (favourite === true) {
        /* TODO: update the change*/
      }

      if (favourite === false) {
        /* TODO: update the change*/
      }
      return !favourite;
    });
  };

  return (
    <Button size="medium" onClick={toggleFavourite} className={favouriteClass}>
      {favourite === true ? isFavourite : isNotFavourite}
    </Button>
  );
};

export default Favourite;
