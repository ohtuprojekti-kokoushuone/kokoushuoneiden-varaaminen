import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Home from './pages/Home.js';
import ChooseTime from './pages/ChooseTime.js';
import Login from './pages/Login.js';
import Reservations from './pages/Reservations.js';
import RoomInfo from './pages/RoomInfo.js';
import TimeOptions from './pages/TimeOptions.js';
import CreateReservation from './pages/CreateReservation.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { setToken } from './requests.ts';
import NavigationBar from './components/NavigationBar.js';
import { basePath } from './config';

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
          <Route path={`${basePath}/`} element={<Login setUser={setUser} />} />
          <Route path="*" element={<Navigate to={`${basePath}/`} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <NavigationBar user={user} />

      <Routes>
        <Route path={`${basePath}/home`} element={<Home />} />
        <Route path={`${basePath}/reservations`} element={<Reservations />} />
        <Route path={`${basePath}/choosetime`} element={<ChooseTime />} />
        <Route path={`${basePath}/roomlist/:id`} element={<RoomInfo />} />
        <Route path={`${basePath}/timeOptions`} element={<TimeOptions />} />
        <Route path={`${basePath}/createReservation/:id`} element={<CreateReservation />} />
        <Route path="*" element={<Navigate to={`${basePath}/home`} />} />
      </Routes>
    </Router>
  );
};

export default App;
