import React, { useState, useRef } from 'react';
import { Message, Button, Icon, Dropdown } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteReservation } from '../requests.ts';
import { updateReservation } from '../requests.ts';
import { editReservation } from '../requests.ts';
import { t } from 'i18next';
import { createDropdownDurationObject } from '../utils/dropdownOptionsUtil';
import DatePicker from 'react-datepicker';
import { setDate } from 'date-fns';

const defaultDuration = 60;
const durations = [15, 30, 45, 60, 75, 90, 105, 120];

const Reservation = ({ res }) => {
  const [newStartDate, setNewStartDate] = useState(new Date());
  const endtest = new Date();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newEndDate, setNewEndDate] = useState(endtest.getTime() + defaultDuration * 60 * 1000);
  const [duration, setDuration] = useState(defaultDuration);
  const [newSubject, setNewSubject] = useState();
  const [reservations, setReservations] = useState([]);

  const datePickerEnd = useRef();

  const handleClick = (id) => {
    const reservation = reservations.find((r) => r.id === id);

    const updatedReservation = {
      ...reservation,
      subject: newSubject,
      start: newStartDate,
      end: newEndDate,
      attendees: []
    };

    editReservation(id, updatedReservation).then((returnedReservation) => {
      setReservations(reservations.map((reservation) => (reservation.id ? reservation : returnedReservation)));
    });
  };

  const handleEditSubject = (id) => {
    const reservation = reservations.find((r) => r.id === id);
    const changedSubject = { ...reservation, subject: newSubject };

    setNewSubject(changedSubject);
  };

  function handleEditStartDate(id, date) {
    const reservation = reservations.find((r) => r.id === id);
    setNewStartDate(date);
    if (newEndDate <= date) {
      let newDate = new Date(date.getTime());
      newDate.setMinutes(date.getMinutes() + defaultDuration);
      setNewEndDate(newDate);
    } else {
      let newDate = new Date(date.getTime());
      newDate.setMinutes(date.getMinutes() + duration);
      setNewEndDate(newDate);
    }
    const changedStartDate = { ...reservation, startDate: newStartDate };

    setNewStartDate(changedStartDate);
  }
  function changeEndDate(event, data) {
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
                  const email = reservation.organizer.email;
                  deleteReservation(email.substr(0, email.indexOf('@')), reservation.id).then(() => {
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
              onChange={handleEditSubject(reservation.id)}
              value={newSubject}
            />
            <p>
              {t('label.currentStartTime')}: {new Date(reservation.start.dateTime).toLocaleString('fi-FI')}
            </p>
            <h3>{t('editStartTime')}</h3>
            <DatePicker
              dateFormat="dd.MM.yyyy HH:mm"
              selected={new Date(reservation.start.dateTime)}
              onChange={(date) => handleEditStartDate(reservation.id, date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption={t('label.time')}
              locale="fi"
              customInput={<input data-testid="start-date-reservation" type="text" />}
            />
            <h3>{t('editDuration')}</h3>
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
              selected={newEndDate}
              disabled
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Aika"
              locale="fi"
              customInput={<input data-testid="end-date-reservation" type="text" />}
            />
            <div>
              <Button color="blue" style={{ marginRight: '10px' }} autoFocus onClick={handleClick(reservation)}>
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
      <td>{res.organizer.name}</td>
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
