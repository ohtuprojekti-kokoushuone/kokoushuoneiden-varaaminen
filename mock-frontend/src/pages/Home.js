import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRoomsInfo } from '../requests';
import Container from 'react-bootstrap/Container';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      <Row xs={1} lg={2} className="g-1">
        {rooms.map((room) => (
          <Col key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
