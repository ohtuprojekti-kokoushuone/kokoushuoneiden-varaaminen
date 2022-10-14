import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import { getRooms } from '../requests';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Filter from './Filter';

const Home = () => {
  const [rooms, setRooms] = useState([]);

  let navigate = useNavigate();

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
    <Container>
      <div>
        <Filter />
      </div>
      <>
        {rooms.map((room) => (
          <Card bg={'Success'.toLowerCase()} key={'Success'} text={'white'} style={{ width: '28rem' }} className="mb-2">
            <Link to={`/roomlist/${room.id}`} key={room.id} style={linkStyle}>
              <Card.Header>{room.id}</Card.Header>
              <Card.Body>
                <Card.Title>Vapaa</Card.Title>
                <Card.Text>{room.name}</Card.Text>
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
        ))}
      </>
    </Container>
  );
};

export default Home;
