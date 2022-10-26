import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { checkAvailability, getRoomsInfo } from '../requests';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

registerLocale('fi', fi);

const ChooseTime = () => {
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getRoomsInfo().then((res) => setRooms(res));
  }, []);

  const roomsToShow = showAll ? rooms : rooms.filter((room) => checkAvailability(room.id, startDate, endDate));

  return (
    <div className="container text-center">
      <Filter />
      <h5>Valitse alku</h5>
      <DatePicker
        dateFormat="dd.MM.yyyy HH:mm"
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
        dateFormat="dd.MM.yyyy HH:mm"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
      />

      <div className="col align-self-center">
        <button onClick={() => setShowAll(!showAll)} className="btn btn-primary btn-lg">
          Näytä {showAll ? 'vapaat kokoushuoneet' : ' kaikki'}
        </button>
      </div>
      <div>
        <Row xs={1} lg={2} className="g-1">
          {roomsToShow.map((room) => (
            <Col key={room.id}>
              <RoomCard room={room} key={room.id} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ChooseTime;
