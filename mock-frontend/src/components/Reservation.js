import React, { useState } from 'react';
import { Button, Icon, Dropdown } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteReservation } from '../requests.ts';
import { updateReservation } from '../requests.ts';
import { t } from 'i18next';
import { createDropdownDurationObject } from '../utils/dropdownOptionsUtil';
import DatePicker from 'react-datepicker';

const defaultDuration = 60;
const durations = [15, 30, 45, 60, 75, 90, 105, 120];

const Reservation = ({ res }) => {
  const [startDate, setStartDate] = useState(new Date());
  const endtest = new Date();
  const [endDate, setEndDate] = useState(endtest.getTime() + defaultDuration * 60 * 1000);
  const [setDuration] = useState(defaultDuration);

  function changeEndDate(event, data) {
    setDuration(data.value);
    const newDate = new Date(startDate.getTime());
    setEndDate(newDate.setMinutes(startDate.getMinutes() + data.value));
  }

  function handleStartDateChange(date) {
    setStartDate(date);
    if (endDate <= date) {
      let newDate = new Date(date.getTime());
      newDate.setMinutes(date.getMinutes() + defaultDuration);
      setEndDate(newDate);
    } else {
      let newDate = new Date(date.getTime());
      newDate.setMinutes(date.getMinutes() + durations);
      setEndDate(newDate);
    }
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
            <h1>{t('editConfirmation')}</h1>
            <h3 style={{ fontWeight: 'bold' }}>
              {t('currentSubject')}: {reservation.subject}
            </h3>{' '}
            <input ref={reservation.subject} type="text" name="subject" placeholder={t('inputNewSubject')} />
            <p>
              {t('label.currentStartTime')}: {new Date(reservation.start.dateTime).toLocaleString('fi-FI')}
            </p>
            <h3>{t('editStartTime')}</h3>
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
            <h3>{t('editDuration')}</h3>
            <Dropdown
              placeholder="Aseta aika"
              selection
              options={createDropdownDurationObject(durations)}
              onChange={changeEndDate}
              defaultValue={defaultDuration}
            />
            <div>
              <Button
                color="blue"
                style={{ marginRight: '10px' }}
                autoFocus
                onClick={() => {
                  const email = reservation.organizer.email;
                  updateReservation(email.substr(0, email.indexOf('@')), reservation.id).then(() => {
                    window.location.reload(true);
                  });
                  onClose();
                }}
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
