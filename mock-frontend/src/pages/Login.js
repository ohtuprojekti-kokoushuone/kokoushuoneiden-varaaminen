import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container text-center">
      <h1>Kirjaudu sisään</h1>
      <form>
        <h5>Käyttäjätunnus</h5>
        <input type="text" name="username" aria-label="username" />
        <h5>Salasana</h5>
        <input type="text" name="password" aria-label="password" />
      </form>
      <div className="col align-self-center">
        <Link to="/home" className="btn btn-primary btn-lg" aria-label="kirjaudu">
          Kirjaudu
        </Link>
      </div>
    </div>
  );
};
export default Login;
