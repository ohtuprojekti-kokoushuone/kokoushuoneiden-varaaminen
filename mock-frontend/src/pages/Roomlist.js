import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getRooms, updateRoom } from "../requests";
import Room from "../components/Room.js";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Roomlist = () => {

    const [rooms, setRooms] = useState([]);
  
    useEffect(() => {
      getRooms().then((res) => {
        setRooms(res);
      });
    }, []);
  
    return(
      <div className="container">
         <Table striped>
          <thead>
            <tr>
              <th scope="col">Huoneen nimi</th>
              <th scope="col">Henkilömäärä</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.size}</td>
                <td><Link to="/roominfo" className="btn btn-primary btn">Huoneen tiedot</Link></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  } 
  
export default Roomlist;  

