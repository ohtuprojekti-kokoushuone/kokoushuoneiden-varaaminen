import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRoomsInfo } from '../requests';
import Container from 'react-bootstrap/Container';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRoomsInfo().then((res) => {
      setRooms(res);
    });
  }, []);

  function filterAvailable(room) {
    if (room.available === true) {
      return true;
    }
  }

  const arrAvailable = rooms.filter(filterAvailable);
  console.log(arrAvailable);

  function filterUnavailable(room) {
    if (room.available === false) {
      return true;
    }
  }

  const arrUnavailable = rooms.filter(filterUnavailable);
  console.log(arrUnavailable);

  return (
    <Container>
      <Filter />
      <Link to="/choosetime" className="btn btn-primary btn-sm mb-2">
        Rajaa tarkemmin
      </Link>
      <Row xs={1} lg={2} className="g-1">
        {arrAvailable.map((room) => (
          <Col key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
        {arrUnavailable.map((room) => (
          <Col key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
