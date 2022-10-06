import React from 'react';
import { Link } from 'react-router-dom';

const RoomInfo = () => {
  return (
    <div className="container text-center">
      <div className="d-grid gap-3 col-8 mx-auto">Huoneen tiedot TBD</div>
      <div className="d-grid gap-3 col-8 mx-auto">
        <Link to="/reservations" className="btn btn-primary btn">
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
