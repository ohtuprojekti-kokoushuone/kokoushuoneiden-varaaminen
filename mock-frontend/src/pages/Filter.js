import React from 'react';
import { Link } from 'react-router-dom';

const Filter = () => {
  return (
    <>
      <div>
        <button className="btn-dark text-white p-1 px-2 mx-4 btn fw-bold mb-2">Exactum</button>
        <button className="btn-dark text-white p-1 px-2 mx-4 btn fw-bold mb-2">Physicum</button>
        <button className="btn-dark text-white p-1 px-2 mx-4 btn fw-bold mb-2">Chemicum</button>
        <Link to="/choosetime" className="btn btn-primary btn-sm mb-2">
          Rajaa tarkemmin
        </Link>
      </div>
    </>
  );
};
export default Filter;
