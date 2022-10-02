import React from 'react';
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

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  const padding = {
    padding: 5
  };

  return (
    <Router>
      
      <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
        <div className="container">
        <Navbar.Brand href="/home">
        <img
          alt="HY Logo"
          src="https://www.hy247.fi/img/hy-logo-white.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />Kokoushuonevaraus</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/login">Kirjaudu sisään</Nav.Link>
              <Nav.Link href="/reservations">Omat varaukset</Nav.Link>
              <Nav.Link href="/choosetime">Valitse aika</Nav.Link>
              <Nav.Link href="/roomlist">Huoneet</Nav.Link>
              <Nav.Link href="/createReservation">Tee varaus</Nav.Link>
              <Nav.Link href="/login">Kirjaudu ulos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/roomlist" element={<Roomlist />} />
        <Route path="/choosetime" element={<ChooseTime />} />
        <Route path="/choosepreference" element={<ChoosePreference />} />
        <Route path="/roominfo" element={<RoomInfo />} />
        <Route path="/timeOptions" element={<TimeOptions />} />
        <Route path="/createReservation" element={<CreateReservation />} />
      </Routes>
    </Router>
  );
};

export default App;
