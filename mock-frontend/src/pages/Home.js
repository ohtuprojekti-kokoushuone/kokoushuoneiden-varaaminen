import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { getRooms } from '../requests';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Filter from './Filter.js';

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms().then((res) => {
      setRooms(res);
    });
  }, []);
  /*TO DO: jakaa huoneet parametrein: success, warning, danger => bg*/
  const linkStyle = {
    textDecoration: 'none',
    color: 'white'
  };

  return (
    <Container text-center>
      <div>
      <Filter />
      </div>
      <>
        {rooms.map((room) => (
          <Card bg={'Success'.toLowerCase()} key={'Success'} text={'white'} style={{ width: '80vh' }} className="mb-2">
            <Link to={`/roomlist/${room.id}`} key={room.id} style={linkStyle}>
              <Card.Header>{room.id}
              </Card.Header>
              <Card.Body>
              <div style={{float: 'right'}}>
                <Link to={`/reservations`} style={linkStyle}>
                <Button variant="primary">Varaa nyt</Button>
                </Link>
              </div>
                <Card.Title>Vapaa</Card.Title>
                <Card.Text>{room.name}</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </>
    </Container>
  );
};

export default Home;
