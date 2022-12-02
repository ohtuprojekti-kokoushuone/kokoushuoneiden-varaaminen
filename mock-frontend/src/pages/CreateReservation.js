import React, { useState, useEffect } from 'react';
import { makeReservation, getRoomById } from '../requests.ts';
import { useParams } from 'react-router-dom';
import { Message, Button, Dropdown } from 'semantic-ui-react';
import { createDropdownDurationObject } from '../utils/dropdownOptionsUtil';
import { useTranslation } from 'react-i18next';
import { basePath } from '../config';
import { getCurrentUser } from '../requests';
import ReservatorDatePicker from '../components/ReservatorDatePicker';

const defaultDuration = 60;
const origDurations = [15, 30, 45, 60, 75, 90, 105, 120];

let defaultSubject = 'varaus';

const CreateReservation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const end = new Date();
  const [endDate, setEndDate] = useState(end.getTime() + defaultDuration * 60 * 1000);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [duration, setDuration] = useState(defaultDuration);
  const [subject, setSubject] = useState('');
  useEffect(() => {
    getCurrentUser().then((data) => {
      setSubject([data.givenName, data.sn, defaultSubject].join(' '));
    });
    return;
  }, []);
  const [maxDuration, setMaxDuration] = useState(defaultDuration);

  const id = useParams().id;

  const { t, i18n } = useTranslation();

  useEffect(() => {
    getRoomById(id).then((res) => {
      setMaxDuration(res.maxTime);
    });
  }, [id]);

  function handleClick() {
    if (!subject) {
      setShow(true);
      setErrorMessage('Error: Give subject for reservation');
      return;
    }

    if (endDate <= startDate) {
      setShow(true);
      setErrorMessage('error.endBeforeStart');
      return;
    }

    const reservation = {
      subject: subject,
      start: startDate,
      end: endDate,
      attendees: []
    };

    makeReservation(id, reservation)
      .then(() => {
        window.location.href = `${basePath}/reservations`;
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShow(true);
      });
  }

  function handleStartDateChange(date) {
    setStartDate(date);
    let newDate = new Date(date.getTime());
    newDate.setMinutes(date.getMinutes() + duration);
    setEndDate(newDate);
  }

  function changeEndDate(event, data) {
    setDuration(data.value);
    const newDate = new Date(startDate.getTime());
    setEndDate(newDate.setMinutes(startDate.getMinutes() + data.value));
  }
  function handleSubjectChange(event) {
    event.preventDefault();
    setSubject(event.target.value);
  }

  const durations = origDurations.filter((dur) => dur <= maxDuration);

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
      <input type="text" name="subject" onChange={handleSubjectChange} value={subject} />
      <h3>{t('chooseStart')}</h3>
      <ReservatorDatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        dateTestId="start-date-reservation"
        t={t}
        i18n={i18n}
      />
      <h3>{t('chooseDuration')}</h3>
      <Dropdown
        selection
        options={createDropdownDurationObject(durations)}
        onChange={changeEndDate}
        defaultValue={defaultDuration}
      />
      <h3>{t('reservationEnd')}</h3>
      <ReservatorDatePicker
        selected={endDate}
        onChange={setEndDate}
        dateTestId="end-date-reservation"
        t={t}
        i18n={i18n}
      />

      <div className="col align-self-center">
        <Button color="blue" onClick={handleClick} className="confirm-button">
          {t('button.reserve')}
        </Button>
      </div>
    </div>
  );
};

export default CreateReservation;
