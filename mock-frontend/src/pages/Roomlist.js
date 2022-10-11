import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRooms } from '../requests';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Roomlist = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms().then((res) => {
      setRooms(res);
    });
  }, []);

  const linkStyle = {
    textDecoration: 'none',
    color: 'white'
  };

  return (
    <Container text-center>
      <>
        {rooms.map((room) => (
          <Card bg={'Success'.toLowerCase()} key={'Success'} text={'white'} style={{ width: '80vh' }} className="mb-2">
            <Link to={`/roomlist/${room.id}`} key={room.id} style={linkStyle}>
              <Card.Header>{room.id}</Card.Header>
              <Card.Body>
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

export default Roomlist;
