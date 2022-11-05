import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { login, setToken } from '../requests.ts';
import { Button } from 'semantic-ui-react';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errorMessage = useRef();

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
      return <Navigate to="/home" />;
    } catch (exception) {
      console.log('wrong credentials');
      errorMessage.current.innerText = 'Wrong credentials!';
    }
  };

  return (
    <div className="container text-center">
      <h1>Kirjaudu sisään</h1>
      <p ref={errorMessage} style={{ color: 'red' }}></p>
      <form onSubmit={handleLogin}>
        <h5>Käyttäjätunnus</h5>
        <input type="text" name="name" required onChange={({ target }) => setUsername(target.value)} />
        <h5>Salasana</h5>
        <input type="password" name="password" required onChange={({ target }) => setPassword(target.value)} />
        <div className="col align-self-center">
          <Button color="blue" type="submit">
            Kirjaudu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
