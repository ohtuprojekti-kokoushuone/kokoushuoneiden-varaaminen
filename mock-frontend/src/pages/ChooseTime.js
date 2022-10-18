import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { checkAvailability, getRooms } from '../requests';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

registerLocale('fi', fi);

const ChooseTime = ({ user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    getRooms().then((res) => setRooms(res));
  }, []);

  return (
    <Container>
      <div>
        <button className="btn-dark text-white p-1 px-2 mx-4 btn fw-bold mb-2">Exactum</button>
        <button className="btn-dark text-white p-1 px-2 mx-4 btn fw-bold mb-2">Physicum</button>
        <button className="btn-dark text-white p-1 px-2 mx-4 btn fw-bold mb-2">Chemicum</button>
      </div>
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

      <div className="col align-self-center">
        <button
          onClick={() =>
            rooms.map((room) =>
              checkAvailability(room.id, startDate, endDate).then((res) => {
                console.log(res);
              })
            )
          }
          className="btn btn-primary btn-lg"
        >
          Näytä vapaat kokoushuoneet
        </button>
      </div>
    </Container>
  );
};

export default ChooseTime;
