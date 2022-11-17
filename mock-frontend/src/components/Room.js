import React from 'react';
import { useTranslation } from 'react-i18next';

const Room = ({ room }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{room.name}</h1>
<<<<<<< Updated upstream
      <p>
        {t('label.size')} {room.size}
      </p>
=======
      <p>email: {room.address}</p>
      <p>Huoneen koko: {room.size} hlö</p>
>>>>>>> Stashed changes
    </div>
  );
};

export default Room;
