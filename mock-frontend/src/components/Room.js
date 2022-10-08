import React from 'react';

const Room = ({ room }) => {
  return (
    <div>
      <h1>{room.name}</h1>
      <p>email: {room.address}</p>
      <p>Huoneen koko</p>
      <p>Seuraava varaus</p>
    </div>
  );
};

export default Room;
