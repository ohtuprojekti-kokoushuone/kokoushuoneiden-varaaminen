import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getRooms, updateRoom, getReservations } from './requests.js';
import Room from './components/Room.js';
import { Table } from 'react-bootstrap';

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    getRooms().then((res) => {
      setRooms(res);
    });
  }, []);

  const toggleReservedRoom = (id) => {
    const room = rooms.find((n) => n.id === id);
    const changedroom = { ...room, available: !room.available };

    updateRoom(id, changedroom).then((res) => {
      setRooms(rooms.map((room) => (room.id === id ? changedroom : room)));
    });
  };

  const roomsToShow = showAll ? rooms : rooms.filter((room) => room.available);

  return (
    <div className="container">
      <nav className="navbar navbar-dark bg-primary">
        <h1>Huoneen varaus</h1>
      </nav>
      <button onClick={() => getReservations('testirakennus.2001', false).then(res=>console.log(res))}>
        Test getting reservations
      </button>
      <h5>Varauksen aihe</h5>
      <form>
        <label>
          Varaus:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div className="row">
        <div className="col">
          <h5>Valitse alku</h5>
          <DatePicker
            dateFormat="dd/MM/yyyy h:mm aa"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
          />
        </div>
        <div className="col">
          <h5>Valitse loppu</h5>
          <DatePicker
            dateFormat="dd/MM/yyyy h:mm aa"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
          />
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setShowAll(!showAll)}
        >
          Näytä {showAll ? 'vapaat' : 'kaikki'}
        </button>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th scope="col">Huoneen numero</th>
            <th scope="col">Henkilömäärä</th>
          </tr>
        </thead>
        <tbody>
          {roomsToShow.map((room) => (
            <Room
              room={room}
              toggleReserved={() => toggleReservedRoom(room.id)}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default App;
