import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const Home = () => {

    return (
      <div className="container text-center">
        <div className="d-grid gap-3 col-8 mx-auto">
          <Link to="/choosetime" className="btn btn-primary btn-lg">Valitse aika</Link>
          <Link to="/roomlist" className="btn btn-primary btn-lg">Näytä vapaat kokoushuoneet</Link>
        </div>
      </div>
      
    )
}

export default Home;