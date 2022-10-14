import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { login, setToken } from '../requests.ts';

const Login = ({ setUser, user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    return <Navigate to="/home" />;
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        username,
        password
      });

      window.localStorage.setItem('loggedReservationsAppUser', JSON.stringify(user));
      setUser(user);
      setToken(user.token);
      setUsername('');
      setPassword('');
      window.location.href = 'http://localhost:3000/home';
    } catch (exception) {
      console.log('wrong crdentials');
    }
  };

  return (
    <div className="container text-center">
      <h1>Kirjaudu sisään</h1>
      <form>
        <h5>Käyttäjätunnus</h5>
        <input type="text" name="name" onChange={({ target }) => setUsername(target.value)} />
        <h5>Salasana</h5>
        <input type="text" name="name" onChange={({ target }) => setPassword(target.value)} />
      </form>
      <div className="col align-self-center">
        <Link to="/home" className="btn btn-primary btn-lg" onClick={handleLogin}>
          Kirjaudu
        </Link>
      </div>
    </div>
  );
};
export default Login;
