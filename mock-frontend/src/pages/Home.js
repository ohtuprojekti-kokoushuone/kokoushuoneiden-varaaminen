import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stack from 'react-bootstrap/Stack';
import { Link } from "react-router-dom";



const Home = () => {

    return (
      <div>
        <Stack gap={3} className="col-md-5 mx-auto">
            <Link to="/choosetime" className="btn btn-primary">Valitse aika</Link>
            <Link to="/roomlist" className="btn btn-primary">Näytä kokoushuoneet</Link>
        </Stack>
      </div>
    )
}

export default Home;