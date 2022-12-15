import React from 'react';
import Home from './pages/Home.js';
import ChooseTime from './pages/ChooseTime.js';
import Reservations from './pages/Reservations.js';
import RoomInfo from './pages/RoomInfo.js';
import EditReservation from './pages/EditReservation.js';
import TimeOptions from './pages/TimeOptions.js';
import CreateReservation from './pages/CreateReservation.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar.js';
import { basePath } from './config';
import Footer from './components/Footer.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';

const App = () => {
  return (
    <div className="page-container">
      <Router>
        <NavigationBar />

        <Routes>
          <Route path={`${basePath}/home`} element={<Home />} />
          <Route path={`${basePath}/reservations`} element={<Reservations />} />
          <Route path={`${basePath}/choosetime`} element={<ChooseTime />} />
          <Route path={`${basePath}/roomlist/:id`} element={<RoomInfo />} />
          <Route path={`${basePath}/timeOptions`} element={<TimeOptions />} />
          <Route path={`${basePath}/createReservation/:id`} element={<CreateReservation />} />
          <Route path={`${basePath}/privacyPolicy`} element={<PrivacyPolicy />} />
          <Route path={`${basePath}/editReservation/:roomId/:id`} element={<EditReservation />} />
          <Route path="*" element={<Navigate to={`${basePath}/home`} />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
