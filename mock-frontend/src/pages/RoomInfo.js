import React, { useEffect, useState } from 'react';
import { getRoomById } from '../requests.ts';
import Room from '../components/Room.js';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const RoomInfo = () => {
  const [room, setValue] = useState('');
  const id = useParams().id;

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
        <Button aria-label="Siirry varaussivulle" onClick={() => navigate(`/CreateReservation/${room.id}`)}>
          Varaa huone
        </Button>
        <Button aria-label="palaa hakutuloksiin" onClick={() => navigate('/home')}>
          Palaa hakutuloksiin
        </Button>
      </div>
    </div>
  );
};

export default RoomInfo;
