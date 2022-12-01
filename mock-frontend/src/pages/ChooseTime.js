import React, { useEffect, useState, useRef } from 'react';
import { checkAvailability, getRoomsInfo } from '../requests';
import Filter from './Filter';
import RoomCard from '../components/RoomCard.js';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import { createDropdownDurationObject } from '../utils/dropdownOptionsUtil';
import { useTranslation } from 'react-i18next';
import useFavourite from '../components/useFavourite.js';
import ReservatorDatePicker from '../components/ReservatorDatePicker';

const defaultDuration = 60;
const durations = [15, 30, 45, 60, 75, 90, 105, 120];

const ChooseTime = () => {
  const [rooms, setRooms] = useState([]);
  const [roomsToShow, setRoomsToShow] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(startDate.getTime() + defaultDuration * 60 * 1000));
  const [duration, setDuration] = useState(defaultDuration);
  const minSize = useRef();
  const { t, i18n } = useTranslation();
  const [favourites, toggleItemInLocalStorage] = useFavourite();

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

  function changeEndDate(event, data) {
    setDuration(data.value);
    const newDate = new Date(startDate.getTime() + data.value * 60 * 1000);
    setEndDate(newDate);
  }

  function handleStartDateChange(date) {
    setStartDate(date);
    let newDate = new Date(date.getTime() + duration * 60 * 1000);
    setEndDate(newDate);
  }

  return (
    <div className="container text-center">
      <Filter />
      <h3>{t('chooseStart')}</h3>
      <ReservatorDatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        dateTestId="start-date"
        t={t}
        i18n={i18n}
      />
      <h3>{t('chooseDuration')}</h3>
      <Dropdown
        placeholder="Aseta aika"
        selection
        options={createDropdownDurationObject(durations)}
        onChange={changeEndDate}
        defaultValue={defaultDuration}
      />
      <h3>{t('chooseEnd')}</h3>
      <ReservatorDatePicker selected={endDate} onChange={setEndDate} dateTestId="end-date" t={t} i18n={i18n} />
      <h3>{t('label.size')}</h3>
      <div className="row justify-content-center">
        <select ref={minSize} className="form-select w-auto justify-content-center">
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="12">12</option>
        </select>
      </div>
      <div className="col align-self-center">
        <Button color="blue" onClick={handleFilter}>
          {t('button.show')}
        </Button>
      </div>
      <div>
        <Grid stackable columns={2}>
          {roomsToShow.map((room) => (
            <Grid.Column key={room.id}>
              <RoomCard
                room={room}
                onHeartClick={() => toggleItemInLocalStorage(room.id)}
                getFavourite={() => favourites.includes(room.id)}
              />
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ChooseTime;
