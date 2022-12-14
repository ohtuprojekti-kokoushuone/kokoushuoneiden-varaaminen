import React, { useEffect, useState } from 'react';
import { getRoomsInfo } from '../requests';
import { Container } from 'semantic-ui-react';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import { Grid, Button } from 'semantic-ui-react';
import { yellowDurationMin } from '../components/RoomCard.js';
import { basePath } from '../config';
import useFavourite from '../components/useFavourite.js';
import { FaHeart, FaFilter, FaUndo } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getRoomsInfo().then((res) => {
      setRooms(res);
    });
  }, []);

  const arrayNotAvailable = [];

  function filterSoonAvailable(room) {
    if (room.availableTime) {
      const now = new Date();
      const availableTime = new Date(room.availableTime);
      let diffInMinutes = Math.trunc((availableTime.getTime() - now.getTime()) / 1000 / 60);

      if (!room.available) {
        if (diffInMinutes < yellowDurationMin) {
          return true;
        }
      }
    }
    if (!room.available) {
      arrayNotAvailable.push(room);
      return false;
    }
  }

  function filterAvailable(room) {
    if (room.available === true) {
      return true;
    }
    return false;
  }

  const arrayAvailable = rooms.filter(filterAvailable);
  const arraySoonAvailable = rooms.filter(filterSoonAvailable);

  arrayAvailable.sort((a, b) => (a.size > b.size ? 1 : -1));
  arraySoonAvailable.sort((a, b) => (a.size > b.size ? 1 : -1));
  arrayNotAvailable.sort((a, b) => (a.size > b.size ? 1 : -1));

  const [favourites, toggleFavourite] = useFavourite();
  const [showFavourite, setShowFavourite] = useState(false);
  const [isActive, setIsActive] = useState(false);

  function filterFavourite(room) {
    if (favourites.includes(room.id)) {
      return true;
    }
    return false;
  }

  const arrayFavourites = rooms.filter(filterFavourite);

  useEffect(() => {
    setShowFavourite(true);
  }, []);

  function toggleFavouriteFilter() {
    if (showFavourite === false) {
      setShowFavourite(true);
      setIsActive(false);
    } else {
      setShowFavourite(false);
      setIsActive(true);
    }
    setFavouriteFilter();
  }

  function setFavouriteFilter() {
    if (showFavourite === true) {
      setRooms(arrayFavourites);
    } else {
      getRoomsInfo().then((res) => {
        setRooms(res);
      });
    }
  }

  function refetchRooms() {
    if (showFavourite === false) {
      getRoomsInfo().then((res) => {
        setRooms(res.filter(filterFavourite));
        return rooms;
      });
    } else {
      getRoomsInfo().then((res) => {
        setRooms(res);
      });
    }
  }

  return (
    <Container>
      <Filter />
      <div className="filter-container">
        <Button
          className={isActive ? 'btn-filter-favourite-selected' : 'btn-filter-favourite'}
          color="blue"
          onClick={() => toggleFavouriteFilter()}
        >
          {t('button.favourites')}&nbsp;&nbsp;&nbsp;
          <FaHeart />
        </Button>
        <Button className="btn-choose" color="blue" href={`${basePath}/choosetime`} data-testid="filter-btn">
          {t('button.filter')}&nbsp;&nbsp;&nbsp;
          <FaFilter />
        </Button>
        <Button className="btn-choose" color="red" onClick={() => refetchRooms(useState)}>
          {t('button.refresh')}&nbsp;&nbsp;&nbsp;
          <FaUndo />
        </Button>
      </div>
      <Grid stackable columns={2}>
        {arrayAvailable.map((room) => (
          <Grid.Column key={room.id}>
            <RoomCard
              room={room}
              onHeartClick={() => toggleFavourite(room.id)}
              getFavourite={() => favourites.includes(room.id)}
            />
          </Grid.Column>
        ))}
        {arraySoonAvailable.map((room) => (
          <Grid.Column key={room.id}>
            <RoomCard
              room={room}
              onHeartClick={() => toggleFavourite(room.id)}
              getFavourite={() => favourites.includes(room.id)}
            />
          </Grid.Column>
        ))}
        {arrayNotAvailable.map((room) => (
          <Grid.Column key={room.id}>
            <RoomCard
              room={room}
              onHeartClick={() => toggleFavourite(room.id)}
              getFavourite={() => favourites.includes(room.id)}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
