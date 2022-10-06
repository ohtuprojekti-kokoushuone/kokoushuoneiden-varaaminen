import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getRooms } from '../requests';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Roomlist = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms().then((res) => {
      setRooms(res);
    });
  }, []);

  /*
  const toggleReservedRoom = (id) => {
    const room = rooms.find((n) => n.id === id);
    const changedroom = { ...room, available: !room.available };

    updateRoom(id, changedroom).then((res) => {
      setRooms(rooms.map((room) => (room.id === id ? changedroom : room)));
    });
  };
  */
  return (
    <div className="container">
      <Table striped>
        <thead>
          <tr>
            <th scope="col">Huoneen numero</th>
            <th scope="col">Huoneen nimi</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr className="table-success" key={room.id}>
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
    </div>
  );
};

export default Roomlist;
