import React, { useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { makeReservation } from '../requests.ts';
import { useParams, Navigate } from 'react-router-dom';

registerLocale('fi', fi);

const CreateReservation = ({ user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const subject = useRef();
  const id = useParams().id;

  function handleClick() {
    if (!subject.current.reportValidity()) return;

    const reservation = {
      subject: subject.current.value,
      start: startDate,
      end: endDate,
      attendees: []
    };

    makeReservation(id, reservation).then((res) => {
      console.log(res); //prints reservation info
      /*if () { //error checking
      }*/
      window.location.href = '/reservations';
    });
  }

  return (
    <div className="container text-center">
      <h5>Aihe</h5>
      <input ref={subject} type="text" name="subject" placeholder="Syötä aihe" required />
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
        <button className="btn btn-primary btn-lg" onClick={handleClick}>
          Tee varaus
        </button>
      </div>
    </div>
  );
};

export default CreateReservation;
