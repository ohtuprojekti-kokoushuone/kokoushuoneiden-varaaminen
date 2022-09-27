import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const ChooseTime = () => {
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  

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
          
        />
        <h5>Valitse huoneen koko</h5>
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
          <Link to="/roomlist" className="btn btn-primary btn-lg">Näytä vapaat kokoushuoneet</Link>
        </div>   
    </div>
  )
}

export default ChooseTime;