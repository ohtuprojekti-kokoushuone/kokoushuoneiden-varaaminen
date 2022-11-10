import React from 'react';
import { Card } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
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
    <Card className={roomInfo.cardType} key={room.id} data-name={room.building}>
      <Card.Content>
        <div className="content">
          <span className="right floated">
            <Favourite room={room} />
          </span>
        </div>
        <Card.Header>{room.name}</Card.Header>
        <Card.Meta>{roomInfo.availability}</Card.Meta>
        <Card.Description>{availableText}</Card.Description>
        <Card.Content extra href={`/roomlist/${room.id}`}>
          <Icon link name="info circle" color="black" />
        </Card.Content>
        <Card.Content extra>
          <span className="right floated">
            <Icon name="users" />
            {room.size} hlö
          </span>
        </Card.Content>
      </Card.Content>
      <Button aria-label="Siirry varaussivulle" color="blue" onClick={() => navigate(`/CreateReservation/${room.id}`)}>
        Varaa huone
      </Button>
    </Card>
  );
};

export default RoomCard;
