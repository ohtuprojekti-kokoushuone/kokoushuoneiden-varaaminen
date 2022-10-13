import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, Navigate } from 'react-router-dom';

const ChoosePreference = ({ user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container text-center">
      <h5>Valitse rakennus:</h5>
      <div className="row justify-content-center">
        <select className="form-select w-auto justify-content-center">
          <option defaultValue>Rakennus</option>
          <option value="Exactum">Exactum</option>
          <option value="Physicum">Physicum</option>
          <option value="Chemicum">Chemicum</option>
        </select>
      </div>
      <h5>Huoneen koko:</h5>
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
        <Link to="/roomlist" className="btn btn-primary btn-lg">
          Näytä vapaat kokoushuoneet
        </Link>
      </div>
    </div>
  );
};
export default ChoosePreference;
