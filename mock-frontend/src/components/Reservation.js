import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteReservation } from '../requests.ts';
import { t } from 'i18next';

const Reservation = ({ res }) => {
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

  let start = new Date(res.start.dateTime);
  let end = new Date(res.end.dateTime);

  return (
    <tr>
      <td>{res.subject}</td>
      <td>{res.organizer.name}</td>
      <td>{start.toLocaleString('fi-FI')}</td>
      <td>{end.toLocaleString('fi-FI')}</td>
      <td>
        <Button color="red" onClick={() => handleDeleteReservation(res)} icon>
          <Icon name="trash" aria-label={t('deleteReservation')} />
        </Button>
      </td>
    </tr>
  );
};

export default Reservation;
