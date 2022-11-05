import React, { useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { makeReservation } from '../requests.ts';
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

registerLocale('fi', fi);

const defaultDuration = 60;

const CreateReservation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const end = new Date();
  end.setMinutes(end.getMinutes() + defaultDuration);
  const [endDate, setEndDate] = useState(end);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subject = useRef();
  const datePickerEnd = useRef();
  const id = useParams().id;

  function handleClick() {
    if (!subject.current.reportValidity()) return;

    if (endDate <= startDate) {
      setShow(true);
      setErrorMessage('Error: Start date must be before end date');
      return;
    }

    const reservation = {
      subject: subject.current.value,
      start: startDate,
      end: endDate,
      attendees: []
    };

    makeReservation(id, reservation)
      .then((res) => {
        window.location.href = '/reservations';
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShow(true);
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
      {show ? (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          {errorMessage}
        </Alert>
      ) : (
        <></>
      )}
      <h5>Aihe</h5>
      <input ref={subject} type="text" name="subject" placeholder="Syötä aihe" required />
      <h5>Valitse alku</h5>
      <DatePicker
        dateFormat="dd.MM.yyyy HH:mm"
        selected={startDate}
        onChange={(date) => handleStartDateChange(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
        customInput={<input data-testid="start-date-reservation" type="text" />}
      />
      <h5>Valitse loppu</h5>
      <DatePicker
        ref={datePickerEnd}
        dateFormat="dd.MM.yyyy HH:mm"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
        customInput={<input data-testid="end-date-reservation" type="text" />}
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
