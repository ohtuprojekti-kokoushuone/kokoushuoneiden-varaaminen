import React, { useState, useRef } from 'react';
import { Message, Button, Icon, Dropdown } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteReservation } from '../requests.ts';
import { updateReservation } from '../requests.ts';
import { editReservation } from '../requests.ts';
import { useTranslation } from 'react-i18next';
import { createDropdownDurationObject } from '../utils/dropdownOptionsUtil';
import ReservatorDatePicker from './ReservatorDatePicker';

const defaultDuration = 60;
const durations = [15, 30, 45, 60, 75, 90, 105, 120];

const Reservation = ({ res }) => {
  const [newStartDate, setNewStartDate] = useState(new Date());
  const endtest = new Date();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newEndDate, setNewEndDate] = useState(endtest.getTime() + defaultDuration * 60 * 1000);
  const [duration, setDuration] = useState(defaultDuration);
  const [newSubject, setNewSubject] = useState('');
  const [reservations, setReservations] = useState([]);

  const { t, i18n } = useTranslation();

  const handleEdit = (id) => {
    const reservation = reservations.find((r) => r.id === id);

    const updatedReservation = {
      ...reservation,
      subject: newSubject
    };
    console.log(updatedReservation);

    /*editReservation(id, updatedReservation).then((returnedReservation) => {
      setReservations(reservations.map((reservation) => (reservation.id ? reservation : returnedReservation)));
    });*/
  };

  function handleEditSubject(event) {
    event.preventDefault();
    setNewSubject(event.target.value);
  }

  function handleEditStartDate(id, date) {
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

  function handleDeleteReservation(reservation) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-body" style={{ width: '500px' }}>
            <h1>{t('deleteConfirmation')}</h1>
            <p style={{ fontWeight: 'bold' }}>{reservation.subject}</p>
            <p>
              {t('label.startTime')}: {new Date(reservation.start.dateTime).toLocaleString('fi-FI')}
            </p>
            <p>
              {t('label.endTime')}: {new Date(reservation.end.dateTime).toLocaleString('fi-FI')}
            </p>

            <div>
              <Button
                color="blue"
                style={{ marginRight: '10px' }}
                autoFocus
                onClick={() => {
                  deleteReservation(res.location.id, reservation.id).then(() => {
                    window.location.reload(true);
                  });
                  onClose();
                }}
              >
                {t('label.yes')}
              </Button>
              <Button color="red" onClick={onClose}>
                {t('label.no')}
              </Button>
            </div>
          </div>
        );
      }
    });
  }

  function handleEditReservation(reservation) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-body" style={{ width: '500px' }}>
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
            <p>
              {t('label.currentStartTime')}: {new Date(reservation.start.dateTime).toLocaleString('fi-FI')}
            </p>
            <h3>{t('editStartTime')}</h3>
            <ReservatorDatePicker
              selected={reservation.startDate}
              onChange={(date) => handleEditStartDate(reservation.id, date)}
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
            <h3>{t('reservationEnd')}</h3>
            <ReservatorDatePicker
              selected={reservation.endDate}
              onChange={setNewEndDate}
              dateTestId="end-date-reservation"
              t={t}
              i18n={i18n}
            />
            <div>
              <Button color="blue" style={{ marginRight: '10px' }} autoFocus onClick={handleEdit(reservation.id)}>
                {t('label.save')}
              </Button>
              <Button color="red" onClick={onClose}>
                {t('label.cancel')}
              </Button>
            </div>
          </div>
        );
      }
    });
  }

  let start = new Date(res.start.dateTime);
  let end = new Date(res.end.dateTime);
  const dateFormatOption = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  return (
    <tr>
      <td>{res.subject}</td>
      <td>{res.location.name}</td>
      <td>{start.toLocaleString('fi-FI', dateFormatOption)}</td>
      <td>{end.toLocaleString('fi-FI', dateFormatOption)}</td>
      <td>
        <Button color="black" onClick={() => handleEditReservation(res)} icon>
          <Icon name="edit outline" aria-label={t('editReservation')} />
        </Button>
      </td>
      <td>
        <Button color="red" onClick={() => handleDeleteReservation(res)} icon>
          <Icon name="trash" aria-label={t('deleteReservation')} />
        </Button>
      </td>
    </tr>
  );
};

export default Reservation;
