import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRoomsInfo } from '../requests';
import { Container } from 'semantic-ui-react';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import { Grid, Button } from 'semantic-ui-react';
import { yellowDurationMin } from '../components/RoomCard.js';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const { t } = useTranslation();
  rooms.sort((a, b) => (a.size > b.size ? 1 : -1));

  useEffect(() => {
    getRoomsInfo().then((res) => {
      setRooms(res);
    });
  }, []);

  const arrayNotAvailable = [];
  const arraySoonAvailable = [];

  function filterAvailable(room) {
    if (room.available === true) {
      return true;
    }
    if (room.availableTime) {
      const now = new Date();
      const availableTime = new Date(room.availableTime);
      let diffInMinutes = Math.trunc((availableTime.getTime() - now.getTime()) / 1000 / 60);

      if (!room.available) {
        if (diffInMinutes < yellowDurationMin) {
          arraySoonAvailable.push(room);
          return false;
        }
      }
    }
    if (!room.available) {
      arrayNotAvailable.push(room);
      return false;
    }
    return false;
  }

  const arrayAvailable = rooms.filter(filterAvailable);

  return (
    <Container>
      <Filter />
      <Button className="btn-choose" color="blue" href="/choosetime">
        {t('button.filter')}
      </Button>
      <Grid stackable columns={3}>
        {arrayAvailable.map((room) => (
          <Grid.Column key={room.id}>
            <RoomCard room={room} />
          </Grid.Column>
        ))}
        {arraySoonAvailable.map((room) => (
          <Grid.Column key={room.id}>
            <RoomCard room={room} />
          </Grid.Column>
        ))}
        {arrayNotAvailable.map((room) => (
          <Grid.Column key={room.id}>
            <RoomCard room={room} />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
