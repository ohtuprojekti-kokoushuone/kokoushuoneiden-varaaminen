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
  const [subject, setSubject] = useState('');

  const { t, i18n } = useTranslation();

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

  function editChosenReservation(reservation) {
    confirmAlert({
      customUI: ({ onClose }) => {
        const toggleEditReservation = (id) => {
          const reservation = reservations.find((r) => r.id === id);
          const changedReservation = { ...reservation, subject: 'newSubject' };

          updateReservation(id, changedReservation)
            .then((returnedReservation) => {
              setReservations(
                reservations.map((reservation) => (reservation.id !== id ? reservation : returnedReservation))
              );
            })
            .catch((error) => {
              alert('Some problem with axios');
              setReservations(reservations.filter((r) => r.id !== id));
            });
        };
        const handleSubjectChange = (event) => {
          event.preventDefault();
          setSubject(event.target.value);
        };
        return (
          <div className="react-confirm-alert-body" style={{ width: '500px' }}>
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
              onChange={handleSubjectChange}
              value={newSubject}
            />
            <div>
              <Button
                color="blue"
                style={{ marginRight: '10px' }}
                autoFocus
                onClick={toggleEditReservation(reservation.id)}
              >
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
        <Button color="black" onClick={() => editChosenReservation(res)} icon>
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
