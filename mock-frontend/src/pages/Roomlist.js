import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRoomsInfo } from '../requests';
import { Link, Navigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Roomlist = ({ user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRoomsInfo().then((res) => {
      setRooms(res);
    });
  }, []);

  const linkStyle = {
    textDecoration: 'none',
    color: 'white'
  };

  function colorToCard(color) {
    if (color === 'green') {
      return 'success';
    } else if (color === 'yellow') {
      return 'warning';
    }
    return 'danger';
  }

  return (
    <Container text-center>
      <>
        {rooms.map((room) => {
          let availableText = '';
          if (room.earliestTime) {
            const time = new Date(room.earliestTime).toLocaleString('fi-FI');
            availableText =
              room.availableColor === 'green' ? 'Huone on vapaa ' + time + ' asti' : 'Huone vapautuu ' + time;
          }

          return (
            <Card
              bg={colorToCard(room.availableColor)}
              key={room.id}
              text={'white'}
              style={{ width: '80vh' }}
              className="mb-2"
            >
              <Link to={`/roomlist/${room.id}`} key={room.id} style={linkStyle}>
                <Card.Header>{room.id}</Card.Header>
                <Card.Body>
                  <Card.Title>Vapaa</Card.Title>
                  <Card.Text>{room.name}</Card.Text>
                  <Card.Text>{availableText}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          );
        })}
      </>
    </Container>
  );
};

export default Roomlist;
