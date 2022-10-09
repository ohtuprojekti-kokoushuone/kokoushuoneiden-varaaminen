import React, { useEffect, useState } from 'react';
import { getRoomById } from '../requests.ts';
import Room from '../components/Room.js';
import { Link, useParams } from 'react-router-dom';

const RoomInfo = () => {
  const [room, setValue] = useState('');
  const id = useParams().id;

  useEffect(() => {
    getRoomById(id).then((res) => {
      setValue(res);
    });
  }, [id]);

  return (
    <div className="container text-center">
      <div className="d-grid gap-3 col-8 mx-auto">
        <Room room={room} key={room.id}></Room>
        <Link to={`/CreateReservation/${room.id}`} className="btn btn-primary btn">
          Varaa huone
        </Link>
        <Link to="/roomlist" className="btn btn-primary btn">
          Palaa hakutuloksiin
        </Link>
      </div>
    </div>
  );
};

export default RoomInfo;
