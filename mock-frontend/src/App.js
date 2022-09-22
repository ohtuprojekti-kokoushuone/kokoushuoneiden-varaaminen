import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getRooms, updateRoom } from "./requests.js";
import Roomlist from "./pages/Roomlist.js";
import Home from "./pages/Home.js";
import ChooseTime from "./pages/ChooseTime.js";
import Login from "./pages/Login.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  const [rooms, setRooms] = useState([]);

  const padding = {
    padding: 5
  }

 
  return (
    <Router>
       <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/login">Login</Link>
        <Link style={padding} to="/choosetime">ChooseTime</Link>
        <Link style={padding} to="/roomlist">Roomlist</Link>

      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roomlist" element={<Roomlist />} />
        
        <Route path="/choosetime" element={<ChooseTime />} />
      </Routes>

    </Router>
  ) 
  
}

export default App;






     

    
    
 






