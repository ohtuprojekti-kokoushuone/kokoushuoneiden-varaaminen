import React, { useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { makeReservation } from '../requests.ts';
import { useParams } from 'react-router-dom';
import { Message, Button } from 'semantic-ui-react';
import { Slider } from 'react-semantic-ui-range';
import { formatMinutes } from '../utils/formatDateUtil';

registerLocale('fi', fi);

const defaultDuration = 60;

const CreateReservation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const end = new Date();
  const [endDate, setEndDate] = useState(end.getTime() + defaultDuration * 60 * 1000);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [duration, setDuration] = useState(defaultDuration);

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
      .then(() => {
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
    } else {
      let newDate = new Date(date.getTime());
      newDate.setMinutes(date.getMinutes() + duration);
      setEndDate(newDate);
    }
  }

  function changeEndDate(minutes) {
    setDuration(minutes);
    setEndDate(end.setMinutes(startDate.getMinutes() + minutes));
  }

  return (
    <div className="container text-center">
      {show ? (
        <Message negative onDismiss={() => setShow(false)}>
          {' '}
          {errorMessage}
        </Message>
      ) : (
        <></>
      )}
      <h3>Aihe</h3>
      <input ref={subject} type="text" name="subject" placeholder="Syötä aihe" required />
      <h3>Valitse alku</h3>
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
      <h3>Valitse kesto</h3>
      <Slider
        inverted={false}
        settings={{
          start: defaultDuration,
          min: 15,
          max: 120,
          step: 15,
          onChange: changeEndDate
        }}
      />
      <h4>{formatMinutes(duration)}</h4>
      <h3>Varauksen loppuaika</h3>
      <DatePicker
        ref={datePickerEnd}
        dateFormat="dd.MM.yyyy HH:mm"
        selected={endDate}
        disabled
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
        customInput={<input data-testid="end-date-reservation" type="text" />}
      />

      <div className="col align-self-center">
        <Button color="blue" onClick={handleClick}>
          Tee varaus
        </Button>
      </div>
    </div>
  );
};

export default CreateReservation;
