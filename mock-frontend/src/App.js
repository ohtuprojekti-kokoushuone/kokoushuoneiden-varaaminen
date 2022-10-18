import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Home from './pages/Home.js';
import ChooseTime from './pages/ChooseTime.js';
import Login from './pages/Login.js';
import Reservations from './pages/Reservations.js';
import RoomInfo from './pages/RoomInfo.js';
import TimeOptions from './pages/TimeOptions.js';
import CreateReservation from './pages/CreateReservation.js';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './hy-logo-white.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setToken } from './requests.ts';

const App = () => {
  const localStoredUser = window.localStorage.getItem('loggedReservationsAppUser');
  const [user, setUser] = useState(JSON.parse(localStoredUser));

  useEffect(() => {
    if (user) {
      setUser(user);
      setToken(user.token);
    }
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedReservationsAppUser');
  };

  return (
    <Router>
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

      <Routes>
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/" element={<Login setUser={setUser} user={user} />} />
        <Route path="/reservations" element={<Reservations user={user} />} />
        <Route path="/choosetime" element={<ChooseTime user={user} />} />
        <Route path="/roomlist/:id" element={<RoomInfo user={user} />} />
        <Route path="/timeOptions" element={<TimeOptions user={user} />} />
        <Route path="/createReservation/:id" element={<CreateReservation user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
