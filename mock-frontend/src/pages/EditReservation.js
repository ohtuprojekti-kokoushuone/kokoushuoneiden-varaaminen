import React, { useState, useEffect } from 'react';
import { getReservationById, updateReservation } from '../requests';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Message, Button, Dropdown } from 'semantic-ui-react';
import { createDropdownDurationObject } from '../utils/dropdownOptionsUtil';
import ReservatorDatePicker from '../components/ReservatorDatePicker';
import { basePath } from '../config';

const defaultDuration = 60;
const durations = [15, 30, 45, 60, 75, 90, 105, 120];

const EditReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newStartDate, setNewStartDate] = useState(new Date());
  const [duration, setDuration] = useState(defaultDuration);
  const end = new Date();
  const [newEndDate, setNewEndDate] = useState(end.getTime() + defaultDuration * 60 * 1000);
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [currentEndDate, setCurrentEndDate] = useState(new Date());
  const id = useParams().id;
  const roomId = useParams().roomId;
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();

  useEffect(() => {
    getReservationById(roomId, id).then((res) => {
      setReservation(res);
      setCurrentStartDate(res.start.dateTime);
      setCurrentEndDate(res.end.dateTime);
    });
  }, [roomId, id]);

  function handleEdit() {
    const updatedReservation = {
      ...reservation,
      subject: newSubject,
      start: newStartDate,
      end: newEndDate,
      attendees: []
    };

    updateReservation(updatedReservation.location.id, id, updatedReservation)
      .then((returnedReservation) => {
        setReservations(reservations.map((reservation) => (reservation.id ? reservation : returnedReservation)));
        window.location.href = `${basePath}/reservations`;
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShow(true);
      });
  }

  function handleEditSubject(event) {
    event.preventDefault();
    setNewSubject(event.target.value);
  }
  function handleEditStartDate(date) {
    setNewStartDate(date);
    let newDate = new Date(date.getTime());
    newDate.setMinutes(date.getMinutes() + duration);
    setNewEndDate(newDate);
  }

  function handleEditEndDate(event, data) {
    setDuration(data.value);
    const newDate = new Date(newStartDate.getTime());
    setNewEndDate(newDate.setMinutes(newStartDate.getMinutes() + data.value));
  }

  function handleReturn() {
    navigate(`${basePath}/reservations`);
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
      <h1>{t('editConfirmation')}</h1>
      <p style={{ fontWeight: 'bold' }}>{reservation.subject}</p>
      <p>
        {t('label.startTime')}: {new Date(currentStartDate).toLocaleString('fi-FI')}
      </p>
      <p>
        {t('label.endTime')}: {new Date(currentEndDate).toLocaleString('fi-FI')}
      </p>
      <input
        type="text"
        name="newSubject"
        placeholder={t('inputNewSubject')}
        onChange={handleEditSubject}
        value={newSubject}
      />
      <h3>{t('editStartTime')}</h3>
      <ReservatorDatePicker
        selected={newStartDate}
        onChange={handleEditStartDate}
        dateTestId="start-date-reservation"
        t={t}
        i18n={i18n}
      />
      <h3>{t('editDuration')}</h3>
      <Dropdown
        selection
        options={createDropdownDurationObject(durations)}
        onChange={handleEditEndDate}
        defaultValue={defaultDuration}
      />
      <h3>{t('editEnd')}</h3>
      <ReservatorDatePicker
        selected={newEndDate}
        onChange={setNewEndDate}
        dateTestId="end-date-reservation"
        t={t}
        i18n={i18n}
      />
      <div className="col align-self-center">
        <Button color="blue" style={{ marginRight: '10px' }} autoFocus onClick={handleEdit}>
          {t('label.save')}
        </Button>
        <Button color="red" onClick={handleReturn}>
          {t('label.cancel')}
        </Button>
      </div>
    </div>
  );
};

export default EditReservation;
