import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const ChooseTime = () => {
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  

  return (
    <div className="container fluid">
        <nav className="navbar navbar-dark bg-primary">
            <h1>Huoneen varaus</h1>
        </nav>
        <h5>Varauksen aihe</h5>
        <form>
            <label>
                Varaus:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>

        <div className="row">
            <div className="col">
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

            <div className="col">
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
          <Link to="/roomlist" className="btn btn-primary">Näytä kokoushuoneet</Link>
        </div>
    </div>
  )
}

export default ChooseTime;