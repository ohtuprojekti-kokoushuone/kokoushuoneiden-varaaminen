import React, { useEffect, useState } from 'react';
import { getReservationById } from '../requests.ts';
import Reservation from '../components/Reservation.js';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { Table } from 'semantic-ui-react';

const EditReservation = () => {
  const [reservation, setValue] = useState([]);
  const id = useParams().id;

  let navigate = useNavigate();

  useEffect(() => {
    getReservationById(id).then((res) => {
      setValue(res.reservation);
    });
  }, [id]);

  return (
    <div className="container text-center">
      <div className="d-grid gap-3 col-8 mx-auto">
        <h1>Muokkaa varausta:</h1>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Varauksen nimi</Table.HeaderCell>
              <Table.HeaderCell>Huone</Table.HeaderCell>
              <Table.HeaderCell>Aloitusaika</Table.HeaderCell>
              <Table.HeaderCell>Lopetusaika</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {reservation.map((res) => (
              <Reservation res={res} key={res.id} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default EditReservation;
