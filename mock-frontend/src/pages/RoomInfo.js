import React, { useEffect, useState } from 'react';
import { getRoomById } from '../requests.ts';
import Room from '../components/Room.js';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { basePath } from '../config';

const RoomInfo = () => {
  const [room, setValue] = useState('');
  const id = useParams().id;

  const { t } = useTranslation();

  let navigate = useNavigate();

  useEffect(() => {
    getRoomById(id).then((res) => {
      setValue(res);
    });
  }, [id]);

  return (
    <div className="container text-center">
      <Room room={room} key={room.id}></Room>
      <Button
        className="roominfo-button"
        aria-label="Siirry varaussivulle"
        color="blue"
        onClick={() => navigate(`${basePath}/CreateReservation/${room.id}`)}
      >
        {t('button.reserveRoom')}
      </Button>
      <Button
        className="roominfo-button"
        aria-label="palaa hakutuloksiin"
        color="blue"
        onClick={() => navigate(`${basePath}/home`)}
      >
        {t('button.returnToSearch')}
      </Button>
    </div>
  );
};

export default RoomInfo;
