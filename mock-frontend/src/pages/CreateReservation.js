import React, { useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { makeReservation } from '../requests.ts';
import { useParams } from 'react-router-dom';

registerLocale('fi', fi);

const defaultDuration = 30;

const CreateReservation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const end = new Date();
  end.setMinutes(end.getMinutes() + defaultDuration);
  const [endDate, setEndDate] = useState(end);

  const subject = useRef();
  const datePickerEnd = useRef();
  const id = useParams().id;

  function handleClick() {
    console.log(startDate, endDate);
    if (!subject.current.reportValidity()) return;

    if (endDate <= startDate) {
      return;
    }

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

  function handleStartDateChange(date) {
    setStartDate(date);
    if (endDate <= date) {
      let newDate = new Date(date.getTime());
      newDate.setMinutes(date.getMinutes() + defaultDuration);
      setEndDate(newDate);
    }
  }

  return (
    <div className="container text-center">
      <h5>Aihe</h5>
      <input ref={subject} type="text" name="subject" placeholder="Syötä aihe" required />
      <h5>Valitse alku</h5>
      <DatePicker
        dateFormat="dd/MM/yyyy HH:mm"
        selected={startDate}
        onChange={(date) => handleStartDateChange(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
      />
      <h5>Valitse loppu</h5>
      <DatePicker
        ref={datePickerEnd}
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
