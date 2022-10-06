import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { getRooms } from '../requests';
import { Table } from 'react-bootstrap';

const Home = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms().then((res) => {
      setRooms(res);
    });
  }, []);

  
  return (
    <div className="container text-center">
      <h1>Vapaat huoneet</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th scope="col">Huoneen numero</th>
            <th scope="col">Huoneen nimi</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr className="table-success">
              <td>{room.id}</td>
              <td>{room.name}</td>
              <td>
                <Link to="/roominfo" className="btn btn-primary btn">
                  Huoneen tiedot
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-grid gap-3 col-8 mx-auto">
        <Link to="/choosetime" className="btn btn-primary btn-lg">
          Valitse aika
        </Link> 
      </div>
    </div>
  );
};

export default Home;
