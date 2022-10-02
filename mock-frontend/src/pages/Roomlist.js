import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getRooms, updateRoom } from "../requests";
import Room from "../components/Room.js";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Roomlist = () => {

    const [rooms, setRooms] = useState([]);
    const [showAll, setShowAll] = useState(true);
  
    useEffect(() => {
      getRooms().then((res) => {
        setRooms(res);
      });
    }, []);
  
    /*
    const toggleReservedRoom = (id) => {
      const room = rooms.find((n) => n.id === id);
      const changedroom = { ...room, available: !room.available };
  
      updateRoom(id, changedroom).then((res) => {
        setRooms(rooms.map((room) => (room.id === id ? changedroom : room)));
      });
    };
    */
   
    const roomsToShow = rooms.filter((room) => room.available === true);
    const roomsNotAvailable = rooms.filter((room) => room.available === false);
  
    return(
      <div className="container">
         <Table striped>
          <thead>
            <tr>
              <th scope="col">Huoneen numero</th>
              <th scope="col">Henkilömäärä</th>
            </tr>
          </thead>
          <tbody>
            {roomsToShow.map((room) => (
              <tr class="table-success">
                <td>{room.id}</td>
                <td>{room.size}</td>
                <td><Link to="/roominfo" className="btn btn-primary btn">Huoneen tiedot</Link></td>
              </tr>
            ))}
            {roomsNotAvailable.map((room) => (
              <tr class="table-danger">
                <td>{room.id}</td>
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