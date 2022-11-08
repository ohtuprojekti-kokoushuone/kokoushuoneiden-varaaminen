import React from 'react';
import { Menu } from 'semantic-ui-react';

import logo from '../hy-logo-white.png';

const NavigationBar = ({ user }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedReservationsAppUser');
  };

  return (
    <Menu inverted fixed="top">
      <Menu.Item href="/home">
        <img alt="HY Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
      </Menu.Item>
      {user === null ? null : (
        <Menu.Menu>
          <Menu.Item href="/reservations">Omat varaukset</Menu.Item>
          <Menu.Item href="/choosetime">Valitse aika</Menu.Item>
          <Menu.Item href="/" onClick={handleLogout}>
            Kirjaudu ulos
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default NavigationBar;
