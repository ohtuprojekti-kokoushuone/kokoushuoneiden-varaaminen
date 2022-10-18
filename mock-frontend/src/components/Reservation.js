import React from 'react';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteReservation } from '../requests.ts';

const Reservation = ({ res }) => {
  function handleDeleteReservation(reservation) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-body" style={{ width: '500px' }}>
            <h1>Haluatko varmasti poistaa varauksen?</h1>
            <p style={{ fontWeight: 'bold' }}>Varauksen nimi: {reservation.subject}</p>
            <p>Aloitusaika: {new Date(reservation.start.dateTime).toLocaleString('fi-FI')}</p>
            <p>Lopetusaika: {new Date(reservation.end.dateTime).toLocaleString('fi-FI')}</p>

            <div>
              <Button
                variant="primary"
                style={{ marginRight: '10px' }}
                autoFocus
                onClick={() => {
                  const email = reservation.organizer.email;
                  deleteReservation(email.substr(0, email.indexOf('@')), reservation.id).then((result) => {
                    console.log(result, reservation);
                    window.location.reload(true);
                  });
                  onClose();
                }}
              >
                Kyllä
              </Button>
              <Button variant="danger" onClick={onClose}>
                Ei
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
      <td>{start.toLocaleString('fi-FI')}</td>
      <td>{end.toLocaleString('fi-FI')}</td>
      <td>
        <Button variant="danger" onClick={() => handleDeleteReservation(res)}>
          X
        </Button>
      </td>
    </tr>
  );
};

export default Reservation;
