import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Roomlist from './pages/Roomlist.js';
import Home from './pages/Home.js';
import ChooseTime from './pages/ChooseTime.js';
import Login from './pages/Login.js';
import ChoosePreference from './pages/ChoosePreference.js';
import Reservations from './pages/Reservations.js';
import RoomInfo from './pages/RoomInfo.js';
import TimeOptions from './pages/TimeOptions.js';
import CreateReservation from './pages/CreateReservation.js';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './hy-logo-white.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setToken } from './requests.ts';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedReservationsAppUser');
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      setUser(storedUser);
      setToken(storedUser.token);
    }
  }, []);

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
                <Nav.Link href="/roomlist">Huoneet</Nav.Link>
                <Nav.Link href="/" onClick={handleLogout}>
                  Kirjaudu ulos
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </div>
      </Navbar>

      {user === null ? (
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/roomlist" element={<Roomlist />} />
          <Route path="/choosetime" element={<ChooseTime />} />
          <Route path="/choosepreference" element={<ChoosePreference />} />
          <Route path="/roomlist/:id" element={<RoomInfo />} />
          <Route path="/timeOptions" element={<TimeOptions />} />
          <Route path="/createReservation/:id" element={<CreateReservation />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
