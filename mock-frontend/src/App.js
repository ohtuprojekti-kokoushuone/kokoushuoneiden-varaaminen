import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Roomlist from "./pages/Roomlist.js";
import Home from "./pages/Home.js";
import ChooseTime from "./pages/ChooseTime.js";
import Login from "./pages/Login.js";
import { Navbar, Nav } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  
  const padding = {
    padding: 5
  }

 
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
        <div className="container">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="/choosetime">ChooseTime</Nav.Link>
            <Nav.Link href="/roomlist">Roomlist</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>

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






     

    
    
 






