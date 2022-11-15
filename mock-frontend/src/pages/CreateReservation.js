import React, { useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { makeReservation } from '../requests.ts';
import { useParams } from 'react-router-dom';
import { Message, Button, Dropdown } from 'semantic-ui-react';
import { createDropdownDurationObject } from '../utils/dropdownOptionsUtil';
import { useTranslation } from 'react-i18next';

registerLocale('fi', fi);

const defaultDuration = 60;
const durations = [15, 30, 45, 60, 75, 90, 105, 120];

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

  const { t } = useTranslation();

  function handleClick() {
    if (!subject.current.reportValidity()) return;

    if (endDate <= startDate) {
      setShow(true);
      setErrorMessage('error.endBeforeStart');
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

  function changeEndDate(event, data) {
    setDuration(data.value);
    const newDate = new Date(startDate.getTime());
    setEndDate(newDate.setMinutes(startDate.getMinutes() + data.value));
  }

  return (
    <div className="container text-center">
      {show ? (
        <Message negative onDismiss={() => setShow(false)}>
          {' '}
          {t(errorMessage)}
        </Message>
      ) : (
        <></>
      )}
      <h3>{t('label.subject')}</h3>
      <input ref={subject} type="text" name="subject" placeholder={t('inputSubject')} required />
      <h3>{t('chooseStart')}</h3>
      <DatePicker
        dateFormat="dd.MM.yyyy HH:mm"
        selected={startDate}
        onChange={(date) => handleStartDateChange(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption={t('label.time')}
        locale="fi"
        customInput={<input data-testid="start-date-reservation" type="text" />}
      />
      <h3>{t('chooseDuration')}</h3>
      <Dropdown
        placeholder="Aseta aika"
        selection
        options={createDropdownDurationObject(durations)}
        onChange={changeEndDate}
        defaultValue={defaultDuration}
      />
      <h3>{t('reservationEnd')}</h3>
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
          {t('button.reserve')}
        </Button>
      </div>
    </div>
  );
};

export default CreateReservation;
