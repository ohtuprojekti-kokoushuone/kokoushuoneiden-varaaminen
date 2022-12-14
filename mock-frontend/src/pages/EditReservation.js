import React, { useState, useEffect } from 'react';
import Reservation from '../components/Reservation.js';
import { getOwnReservations, getReservationById, updateReservation } from '../requests';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Message, Button, Icon, Dropdown } from 'semantic-ui-react';
import { createDropdownDurationObject } from '../utils/dropdownOptionsUtil';
import { Table } from 'semantic-ui-react';
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
  const endtest = new Date();
  const [newEndDate, setNewEndDate] = useState(endtest.getTime() + defaultDuration * 60 * 1000);

  const id = useParams().id;
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();

  /*useEffect(() => {
    getOwnReservations().then((data) => {
      setReservations(data);
    });
  }, []);
  console.log(reservations);

  const reservationToEdit = reservations.find((r) => r.id === id);
  console.log(reservationToEdit);
  const reservation = { ...reservationToEdit };
  console.log(reservation);*/

  useEffect(() => {
    getReservationById('testirakennus.2002', id).then((res) => {
      setReservation(res);
    });
  }, []);
  console.log(reservation);

  function handleEditSubject(event) {
    event.preventDefault();
    console.log(event.target.value);
    setNewSubject(event.target.value);
  }

  function handleEdit() {
    const updatedReservation = {
      ...reservation,
      subject: newSubject
    };
    console.log(updatedReservation);

    updateReservation('testirakennus.2002', id, updatedReservation).then((returnedReservation) => {
      setReservations(reservations.map((reservation) => (reservation.id ? reservation : returnedReservation)));
    });
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
      <h3 style={{ fontWeight: 'bold' }}>
        {t('currentSubject')}: {reservation.subject}
      </h3>{' '}
      <input
        type="text"
        name="newSubject"
        placeholder={t('inputNewSubject')}
        onChange={handleEditSubject}
        value={newSubject}
      />
      <div>
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
