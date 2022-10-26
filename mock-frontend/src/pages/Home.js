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

  return (
    <Container>
      <Filter />
      <Link to="/choosetime" className="btn btn-primary btn-sm mb-2">
        Rajaa tarkemmin
      </Link>
      <Row xs={1} md={2} className="g-2">
        {rooms
          .sort((a, b) => b.available - a.available)
          .map((room) => (
            <Col key={room.id}>
              <RoomCard room={room} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;
