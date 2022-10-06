import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container text-center">
      <h1>Kirjaudu sisään</h1>
      <form>
        <h5>Käyttäjätunnus</h5>
        <input type="text" name="name" />
        <h5>Salasana</h5>
        <input type="text" name="name" />
      </form>
      <div className="col align-self-center">
        <Link to="/home" className="btn btn-primary btn-lg">
          Kirjaudu
        </Link>
      </div>
    </div>
  );
};
export default Login;
