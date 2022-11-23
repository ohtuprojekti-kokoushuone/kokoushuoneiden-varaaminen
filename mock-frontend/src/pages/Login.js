import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { login, setToken } from '../requests.ts';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { basePath } from '../config';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errorMessage = useRef();

  const { t } = useTranslation();

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
      return <Navigate to={`${basePath}/home`} />;
    } catch (exception) {
      errorMessage.current.innerText = 'Wrong credentials!';
    }
  };

  return (
    <div className="container text-center">
      <h1>{t('loginTitle')}</h1>
      <p ref={errorMessage} style={{ color: 'red' }}></p>
      <form onSubmit={handleLogin}>
        <h3>{t('label.username')}</h3>
        <input type="text" name="name" required onChange={({ target }) => setUsername(target.value)} />
        <h3>{t('label.password')}</h3>
        <input type="password" name="password" required onChange={({ target }) => setPassword(target.value)} />
        <div className="col align-self-center">
          <Button color="blue" type="submit">
            {t('button.login')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
