import React from 'react';
import { Card } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import Favourite from './Favourite';
import 'semantic-ui-css/semantic.min.css';
import { useTranslation } from 'react-i18next';

export const yellowDurationMin = 5;

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  let availableText = '';
  let roomInfo = room.available
    ? { availability: t('label.available'), cardType: 'green' }
    : { availability: t('label.notAvailable'), cardType: 'red' };

  if (room.availableTime) {
    const now = new Date();
    const availableTime = new Date(room.availableTime);
    const time = format(availableTime, 'dd.MM.yyyy kk:mm');
    availableText = room.available ? t('availableUntil', { time: time }) : t('reservedUntil', { time: time });

    let diffInMinutes = Math.trunc((availableTime.getTime() - now.getTime()) / 1000 / 60);

    if (!room.available) {
      if (diffInMinutes < yellowDurationMin) {
        roomInfo = { availability: 'Vapautumassa', cardType: 'yellow' };
        availableText += ' (' + diffInMinutes + ' min)';
      }
    }
  }

  return (
    <Card className={roomInfo.cardType} key={room.id} data-building={room.building}>
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
            {room.size} {t('unit.people')}
          </span>
        </Card.Content>
      </Card.Content>
      <Button aria-label="Siirry varaussivulle" color="blue" onClick={() => navigate(`/CreateReservation/${room.id}`)}>
        {t('button.reserveRoom')}
      </Button>
    </Card>
  );
};

export default RoomCard;
