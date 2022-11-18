import React from 'react';
import { useTranslation } from 'react-i18next';

const Room = ({ room }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{room.name}</h1>
      <p>
        {t('label.size')} {room.size}
      </p>
    </div>
  );
};

export default Room;
