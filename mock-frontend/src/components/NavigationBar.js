import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../hy-logo-white.png';

const NavigationBar = ({ user }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedReservationsAppUser');
  };

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
      <div className="container">
        <Navbar.Brand href="/home">
          <img alt="HY Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
          Kokoushuonevaraus
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {user === null ? null : (
            <Nav className="mr-auto">
              <Nav.Link href="/reservations">Omat varaukset</Nav.Link>
              <Nav.Link href="/choosetime">Valitse aika</Nav.Link>
              <Nav.Link href="/" onClick={handleLogout}>
                Kirjaudu ulos
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
