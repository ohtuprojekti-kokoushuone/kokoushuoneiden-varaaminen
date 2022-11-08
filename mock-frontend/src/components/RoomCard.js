import React from 'react';
import { Card } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import Favourite from './Favourite';
import 'semantic-ui-css/semantic.min.css';

export const yellowDurationMin = 5;

const RoomCard = ({ room }) => {
  let navigate = useNavigate();

  let availableText = '';
  let roomInfo = room.available
    ? { availability: 'Vapaa', cardType: 'green' }
    : { availability: 'Varattu', cardType: 'red' };

  if (room.availableTime) {
    const now = new Date();
    const availableTime = new Date(room.availableTime);
    const time = format(availableTime, 'dd.MM.yyyy kk:mm');
    availableText = room.available ? 'Huone on vapaa ' + time + ' asti' : 'Huone vapautuu ' + time;

    let diffInMinutes = Math.trunc((availableTime.getTime() - now.getTime()) / 1000 / 60);

    if (!room.available) {
      if (diffInMinutes < yellowDurationMin) {
        roomInfo = { availability: 'Vapautumassa', cardType: 'yellow' };
        availableText += ' (' + diffInMinutes + ' min)';
      }
    }
  }

  return (
    <Card
      bg={roomInfo.cardType}
      key={room.id}
      text={'white'}
      style={{ width: '28rem' }}
      className="mb-2"
      data-name={room.building}
    >
      <Card.Header>
        {room.id}
        <div style={{ float: 'right' }}>
          <Favourite room={room} />
        </div>
      </Card.Header>
      <Link to={`/roomlist/${room.id}`} key={room.id} style={linkStyle}>
        <Card.Body>
          <Card.Title>{roomInfo.availability}</Card.Title>
          <Card.Text>{room.name}</Card.Text>
          <Card.Text>{availableText}</Card.Text>
        </Card.Body>
      </Link>
      <Button
        aria-label="Siirry varaussivulle"
        variant="primary"
        onClick={() => navigate(`/CreateReservation/${room.id}`)}
      >
        Varaa huone
      </Button>
    </Card>
  );
};

export default RoomCard;
