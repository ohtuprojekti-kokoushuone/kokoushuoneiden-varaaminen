import React from 'react';
import { Card } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import 'semantic-ui-css/semantic.min.css';
import { useTranslation } from 'react-i18next';
import { basePath } from '../config';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const yellowDurationMin = 5;
const yellowDurationReservedSoon = 15;

const RoomCard = ({ room, onHeartClick, getFavourite }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  let availableText = '';
  let roomInfo = room.available
    ? { availability: t('label.available'), cardType: 'green' }
    : { availability: t('label.notAvailable'), cardType: 'red' };

  if (room.availableTime) {
    const now = new Date();
    const availableTime = new Date(room.availableTime);
    const time = format(availableTime, 'dd.MM.yyyy HH:mm');
    availableText = room.available ? t('availableUntil', { time: time }) : t('reservedUntil', { time: time });

    let diffInMinutes = Math.trunc((availableTime.getTime() - now.getTime()) / 1000 / 60);

    if (!room.available) {
      if (diffInMinutes < yellowDurationMin) {
        roomInfo = { availability: t('label.availableSoon'), cardType: 'yellow' };
        availableText += ' (' + diffInMinutes + ' min)';
      }
    } else if (room.available && diffInMinutes <= yellowDurationReservedSoon) {
      roomInfo = { availability: t('label.reservedSoon'), cardType: 'yellow' };
      availableText += ' (' + diffInMinutes + ' min)';
    }
  }
  const favouriteClass = 'favourite';
  const isNotFavourite = <FaRegHeart className={favouriteClass} />;
  const isFavourite = <FaHeart className={favouriteClass} />;

  return (
    <Card className={roomInfo.cardType + ' roomcard'} key={room.id} data-building={room.building}>
      <Card.Content>
        <div className="content">
          <span className="right floated">
            <Button
              size="medium"
              onClick={onHeartClick()}
              className={favouriteClass}
              aria-label={t('addFav', { room: room.id })}
            >
              {getFavourite() ? isFavourite : isNotFavourite}
            </Button>
          </span>
        </div>
        <Card.Header>{room.name}</Card.Header>
        <Card.Meta>{roomInfo.availability}</Card.Meta>
        <Card.Description>{availableText}</Card.Description>
        <Card.Content extra href={`${basePath}/roomlist/${room.id}`}>
          <Icon link name="info circle" color="black" aria-label={t('button.roomInfo')} />
        </Card.Content>
        <Card.Content extra>
          <span className="right floated">
            <Icon name="users" />
            {room.size} {t('unit.people')}
          </span>
        </Card.Content>
      </Card.Content>
      <Button
        aria-label={t('button.reserveRoom')}
        color="blue"
        onClick={() => navigate(`${basePath}/CreateReservation/${room.id}`)}
      >
        {t('button.reserveRoom')}
      </Button>
    </Card>
  );
};

export default RoomCard;
