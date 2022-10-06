import React, { useEffect, useState } from 'react';
import { getReservations } from '../requests.ts';
import Reservation from '../components/Reservation.js';
import { Table } from 'react-bootstrap';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservations('testirakennus.2001', false).then((res) => {
      setReservations(res.reservations);
    });
  }, []);

  return (
    <div className="container text-center">
      <div className="d-grid gap-3 col-8 mx-auto">
        <h1>Omat varaukset:</h1>
        <Table striped>
          <thead>
            <tr>
              <th scope="col">Varauksen nimi</th>
              <th scope="col">Aloitusaika</th>
              <th scope="col">Lopetusaika</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <Reservation res={res} key={res.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Reservations;
