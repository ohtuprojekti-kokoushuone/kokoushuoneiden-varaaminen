import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRoomsInfo } from '../requests';
import { Container } from 'semantic-ui-react';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { yellowDurationMin } from '../components/RoomCard.js';
import 'semantic-ui-css/semantic.min.css';

const Home = () => {
  const [rooms, setRooms] = useState([]);

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

  console.log(arraySoonAvailable);

  return (
    <Container>
      <Filter />
      <Link to="/choosetime" className="btn btn-primary btn-sm mb-2">
        Rajaa tarkemmin
      </Link>
      <Grid stackable columns={2}>
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
