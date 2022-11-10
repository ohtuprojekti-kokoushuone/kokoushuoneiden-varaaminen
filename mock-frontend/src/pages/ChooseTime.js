import React, { useEffect, useState, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import 'react-datepicker/dist/react-datepicker.css';
import { checkAvailability, getRoomsInfo } from '../requests';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import { Grid, Button } from 'semantic-ui-react';

registerLocale('fi', fi);

const ChooseTime = () => {
  const [rooms, setRooms] = useState([]);
  const [roomsToShow, setRoomsToShow] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const minSize = useRef();

  useEffect(() => {
    getRoomsInfo().then((res) => setRooms(res));
  }, []);

  const handleFilter = async () => {
    let roomstest = rooms.filter((room) => {
      return room.building === 'Testirakennus';
    });

    roomstest = await Promise.all(
      roomstest.map(async (room) => {
        const huone = await checkAvailability(room.id, startDate, endDate);
        if (huone.available && room.size >= minSize.current.value) {
          return room;
        }
        return false;
      })
    );

    roomstest = roomstest.filter((room) => room !== false);

    setRoomsToShow(roomstest);
  };

  return (
    <div className="container text-center">
      <Filter />
      <h3>Valitse alku</h3>
      <DatePicker
        dateFormat="dd.MM.yyyy HH:mm"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
        customInput={<input data-testid="start-date" type="text" />}
      />
      <h3>Valitse loppu</h3>
      <DatePicker
        dateFormat="dd.MM.yyyy HH:mm"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
        customInput={<input data-testid="end-date" type="text" />}
      />
      <div className="row justify-content-center">
        <h5>Huoneen koko</h5>
        <select ref={minSize} className="form-select w-auto justify-content-center">
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="12">12</option>
        </select>
      </div>
      <div className="col align-self-center">
        <Button color="blue" onClick={handleFilter}>
          Näytä vapaat kokoushuoneet
        </Button>
      </div>
      <div>
        <Grid stackable columns={2}>
          {roomsToShow.map((room) => (
            <Grid.Column key={room.id}>
              <RoomCard room={room} />
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ChooseTime;
