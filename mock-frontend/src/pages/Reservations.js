import React, { useEffect, useState } from 'react';
import { getReservations } from '../requests.ts';
import Reservation from '../components/Reservation.js';

import { Table } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getReservations('testirakennus.2001', false).then((res) => {
      setReservations(res.reservations);
    });
  }, []);

  return (
    <div className="container text-center">
      <div className="d-grid gap-3 col-8 mx-auto">
        <h1>{t('label.reservations')}</h1>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('label.subject')}</Table.HeaderCell>
              <Table.HeaderCell>{t('label.room')}</Table.HeaderCell>
              <Table.HeaderCell>{t('label.startTime')}</Table.HeaderCell>
              <Table.HeaderCell>{t('label.endTime')}</Table.HeaderCell>
              <Table.HeaderCell>{t('deleteReservation')}</Table.HeaderCell>
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
