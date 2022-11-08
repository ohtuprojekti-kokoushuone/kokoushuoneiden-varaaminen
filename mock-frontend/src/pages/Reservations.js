import React, { useEffect, useState } from 'react';
import { getReservations } from '../requests.ts';
import Reservation from '../components/Reservation.js';

import { Table } from 'semantic-ui-react';

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
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Varauksen nimi</Table.HeaderCell>
              <Table.HeaderCell>Huone</Table.HeaderCell>
              <Table.HeaderCell>Aloitusaika</Table.HeaderCell>
              <Table.HeaderCell>Lopetusaika</Table.HeaderCell>
              <Table.HeaderCell>Poista varaus</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {reservations.map((res) => (
              <Reservation res={res} key={res.id} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Reservations;
