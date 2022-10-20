import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { checkAvailability, getRoomsInfo } from '../requests';
import RoomCard from '../components/RoomCard.js';
import Container from 'react-bootstrap/Container';

registerLocale('fi', fi);

const ChooseTime = () => {
  const [rooms, setRooms] = useState([]);
  const [roomsToShow, setRoomsToShow] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    getRoomsInfo().then((res) => setRooms(res));
  }, []);

  const handleFilter = async () => {
    /*  setRoomsToShow(
      rooms.map((room) => {
        checkAvailability(room.id, startDate, endDate).then((res) => {
          if (res.available) {
            return room;
          }
        });
      })
    );
  */
    let roomstest = rooms.filter((room) => {
      return room.building === 'Testirakennus';
    });

    roomstest = await Promise.all(
      roomstest.map(async (room) => {
        const huone = await checkAvailability(room.id, startDate, endDate);
        if (huone.available) {
          return room;
        }
        return false;
      })
    );

    roomstest = roomstest.filter((room) => room !== false);

    setRoomsToShow(roomstest);
  };

  return (
    <div className="container text-center">
      <h5>Valitse alku</h5>
      <DatePicker
        dateFormat="dd/MM/yyyy HH:mm"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
      />
      <h5>Valitse loppu</h5>
      <DatePicker
        dateFormat="dd/MM/yyyy HH:mm"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
      />
      <h5>Rajaa hakua</h5>
      <div className="row justify-content-center">
        <select className="form-select w-auto justify-content-center">
          <option defaultValue>Rakennus</option>
          <option value="Exactum">Exactum</option>
          <option value="Physicum">Physicum</option>
          <option value="Chemicum">Chemicum</option>
        </select>
      </div>
      <div className="row justify-content-center">
        <select className="form-select w-auto justify-content-center">
          <option defaultValue>Huoneen koko</option>
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="12">12</option>
        </select>
      </div>

      <div className="col align-self-center">
        <button onClick={handleFilter} className="btn btn-primary btn-lg">
          Näytä vapaat kokoushuoneet
        </button>
      </div>

      <Container>
        <div>
          {roomsToShow.map((room) => (
            <RoomCard room={room} key={room.id} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ChooseTime;
