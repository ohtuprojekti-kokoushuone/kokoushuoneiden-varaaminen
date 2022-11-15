import React, { useEffect, useState } from 'react';
import { getRoomById } from '../requests.ts';
import Room from '../components/Room.js';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

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
      <div className="d-grid gap-3 col-8 mx-auto">
        <Room room={room} key={room.id}></Room>
        <Button
          aria-label="Siirry varaussivulle"
          color="blue"
          onClick={() => navigate(`/CreateReservation/${room.id}`)}
        >
          {t('button.reserveRoom')}
        </Button>
        <Button aria-label="palaa hakutuloksiin" color="blue" onClick={() => navigate('/home')}>
          {t('button.returnToSearch')}
        </Button>
      </div>
    </div>
  );
};

export default RoomInfo;
