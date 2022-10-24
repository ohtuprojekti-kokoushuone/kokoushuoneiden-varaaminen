import React from 'react';

const Room = ({ room }) => {
  return (
    <div>
      <h1>{room.name}</h1>
      <p>email: {room.address}</p>
      <p>Huoneen koko {room.size}</p>
    </div>
  );
};

export default Room;
