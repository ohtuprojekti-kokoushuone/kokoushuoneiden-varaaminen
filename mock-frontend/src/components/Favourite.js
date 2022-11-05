import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

const fontStyles = { color: 'red', fontSize: '25px', borderRadius: '5px', padding: '1px 1px' };

const Favourite = ({ room }) => {
  return <SetStateAndToggle room={room} />;
};

const SetStateAndToggle = ({ room }) => {
  const [favourite, setFavourite] = useState(false);

  const isNotFavourite = <FaRegHeart style={fontStyles} />;
  const isFavourite = <FaHeart style={fontStyles} />;

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
    <Button className="btn btn-light btn-small" onClick={toggleFavourite}>
      {favourite === true ? isFavourite : isNotFavourite}
    </Button>
  );
};

export default Favourite;
