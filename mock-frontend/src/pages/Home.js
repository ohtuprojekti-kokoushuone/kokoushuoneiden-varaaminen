import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, Navigate } from 'react-router-dom';
import { getRooms } from '../requests';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Home = ({ user }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms().then((res) => {
      setRooms(res);
    });
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  /*TODO: jakaa huoneet parametrein: success, warning, danger => bg*/
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

      <div className="d-grid gap-3 col-5 mb-2">
        <Link to="/choosetime" className="btn btn-primary btn-lg">
          Valitse aika
        </Link>
      </div>
    </Container>
  );
};

export default Home;
