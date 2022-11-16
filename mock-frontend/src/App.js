import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Home from './pages/Home.js';
import ChooseTime from './pages/ChooseTime.js';
import Login from './pages/Login.js';
import Reservations from './pages/Reservations.js';
import RoomInfo from './pages/RoomInfo.js';
import TimeOptions from './pages/TimeOptions.js';
import CreateReservation from './pages/CreateReservation.js';
import EditReservation from './pages/EditReservation.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { setToken } from './requests.ts';
import NavigationBar from './components/NavigationBar.js';

const App = () => {
  const localStoredUser = window.localStorage.getItem('loggedReservationsAppUser');
  const [user, setUser] = useState(JSON.parse(localStoredUser));

  useEffect(() => {
    if (user) {
      setUser(user);
      setToken(user.token);
    }
  }, [user]);

  if (!user) {
    return (
      <Router>
        <NavigationBar user={user} />
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <NavigationBar user={user} />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/choosetime" element={<ChooseTime />} />
        <Route path="/roomlist/:id" element={<RoomInfo />} />
        <Route path="/timeOptions" element={<TimeOptions />} />
        <Route path="/createReservation/:id" element={<CreateReservation />} />
        <Route path="/editReservation/:id" element={<EditReservation />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
