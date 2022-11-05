import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRoomsInfo } from '../requests';
import Container from 'react-bootstrap/Container';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { yellowDurationMin } from '../components/RoomCard.js';

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

  return (
    <Container>
      <Filter />
      <Link to="/choosetime" className="btn btn-primary btn-sm mb-2">
        Rajaa tarkemmin
      </Link>
      <Row xs={1} lg={2} className="g-1">
        {arrayAvailable.map((room) => (
          <Col key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
        {arraySoonAvailable.map((room) => (
          <Col key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
        {arrayNotAvailable.map((room) => (
          <Col key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
