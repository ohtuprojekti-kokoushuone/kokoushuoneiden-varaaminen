import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { getRoomsInfo } from '../requests';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Filter from './Filter';

const Home = ({ user }) => {
  const [rooms, setRooms] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getRoomsInfo().then((res) => {
      setRooms(res);
    });
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'white'
  };

  return (
    <Container>
      <div>
        <Filter />
      </div>
      <>
        {rooms.map((room) => {
          let availableText = '';
          let roomInfo = room.available
            ? { availability: 'Vapaa', cardType: 'success' }
            : { availability: 'Varattu', cardType: 'danger' };

          if (room.availableTime) {
            const now = new Date();
            const availableTime = new Date(room.availableTime);
            const time = availableTime.toLocaleString('fi-FI');
            availableText = room.available ? 'Huone on vapaa ' + time + ' asti' : 'Huone vapautuu ' + time;

            let diffInMinutes = Math.trunc((availableTime.getTime() - now.getTime()) / 1000 / 60);

            if (!room.available) {
              if (diffInMinutes < 30) {
                roomInfo = { availability: 'Vapautumassa', cardType: 'warning' };
                availableText += ' (' + diffInMinutes + ' min)';
              }
            }
          }

          return (
            <Card bg={roomInfo.cardType} key={room.id} text={'white'} style={{ width: '28rem' }} className="mb-2">
              <Link to={`/roomlist/${room.id}`} key={room.id} style={linkStyle}>
                <Card.Header>{room.id}</Card.Header>
                <Card.Body>
                  <Card.Title>{roomInfo.availability}</Card.Title>
                  <Card.Text>{room.name}</Card.Text>
                  <Card.Text>{availableText}</Card.Text>
                </Card.Body>
              </Link>
              <Button
                aria-label="Siirry varaussivulle"
                variant="primary"
                onClick={() => navigate(`/CreateReservation/${room.id}`)}
              >
                Varaa huone
              </Button>
            </Card>
          );
        })}
      </>
    </Container>
  );
};

export default Home;
