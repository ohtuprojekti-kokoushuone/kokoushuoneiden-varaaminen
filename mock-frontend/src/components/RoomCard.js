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
    <Card color={roomInfo.cardType} key={room.id} data-name={room.building}>
      <Card.Content>
        <Card.Header>
          {room.name}
          <div style={{ float: 'right' }}>
            <Favourite room={room} />
          </div>
        </Card.Header>
        <Card.Meta href={`/roomlist/${room.id}`}>{roomInfo.availability}</Card.Meta>
        <Card.Description>{availableText}</Card.Description>
      </Card.Content>

      <Button aria-label="Siirry varaussivulle" color="blue" onClick={() => navigate(`/CreateReservation/${room.id}`)}>
        Varaa huone
      </Button>
    </Card>
  );
};

export default RoomCard;
