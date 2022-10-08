import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import "react-datepicker/dist/react-datepicker.css";
import { checkAvailability, getRooms } from "../requests";

registerLocale('fi', fi);

const ChooseTime = () => {
  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    getRooms().then((res) => setRooms(res));
  }, []);

  return (
    <div className="container text-center">
      <h5>Valitse alku</h5>
      <DatePicker
        dateFormat="dd/MM/yyyy HH:mm"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
      />
      <h5>Valitse loppu</h5>
      <DatePicker
        dateFormat="dd/MM/yyyy HH:mm"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Aika"
        locale="fi"
      />
      <h5>Rajaa hakua</h5>
        <div className="row justify-content-center">
          <select className="form-select w-auto justify-content-center">
            <option defaultValue>Rakennus</option>
            <option value="Exactum">Exactum</option>
            <option value="Physicum">Physicum</option>
            <option value="Chemicum">Chemicum</option>      
          </select>
        </div>
        <div className="row justify-content-center">
          <select className="form-select w-auto justify-content-center">
            <option defaultValue>Huoneen koko</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="10">10</option>
            <option value="12">12</option>
          </select>
        </div>

      <div className="col align-self-center">
        <button
          onClick={() =>
            rooms.map((room) =>
              checkAvailability(room.id, startDate, endDate).then((res) => {
                console.log(res);
              })
            )
          }
          className="btn btn-primary btn-lg"
        >
          Näytä vapaat kokoushuoneet
        </button>
      </div>
    </div>
  );
};

export default ChooseTime;
