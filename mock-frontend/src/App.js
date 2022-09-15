import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getRooms } from "./requests.js";
import Huone from "./components/Huone.js";
import { Table } from "react-bootstrap";

const App = () => {
  const [huoneet, setHuoneet] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    getRooms().then((res) => {
      setHuoneet(res);
    });
  }, []);

  /*const toggleReservedRoom = id => {
    const huone = huoneet.find(n => n.id === id)
    const changedHuone = { ...huone, vapaa: !huone.vapaa}

    huoneService
    .update(id, changedHuone)
    .then(response => {
      setHuoneet(huoneet.map(huone => huone.id !== id ? huone : response.data))
    })
    
  }*/

  const huoneetToShow = showAll
    ? huoneet
    : huoneet.filter((huone) => huone.vapaa);

  return (
    <div className="container">
      <nav class="navbar navbar-dark bg-primary">
        <a class="navbar-brand mb-0 h1">Huoneen varaus</a>
      </nav>
      <h5>Varauksen aihe</h5>
      <form>
        <label>
          Varaus:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div class="row">
        <div class="col">
          <h5>Valitse alku</h5>
          <DatePicker
            dateFormat="dd/MM/yyyy h:mm aa"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
          />
        </div>
        <div class="col">
          <h5>Valitse loppu</h5>
          <DatePicker
            dateFormat="dd/MM/yyyy h:mm aa"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
          />
        </div>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={() => setShowAll(!showAll)}
        >
          Näytä {showAll ? "vapaat" : "kaikki"}
        </button>
      </div>

      <Table striped>
        <thead>
          <tr>
            <th scope="col">Huoneen numero</th>
            <th scope="col">Henkilömäärä</th>
          </tr>
        </thead>
        <tbody>
          {huoneetToShow.map((huone) => (
            <tr key={huone.id}>
              <td>{huone.id}</td>
              <td>{huone.koko}</td>
              <td>
                <Huone
                  huone={huone}
                  toggleReserved={() => {} /*toggleReservedRoom(huone.id)*/}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default App;
