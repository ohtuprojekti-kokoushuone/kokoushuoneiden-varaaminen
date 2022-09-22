import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getRooms, updateRoom } from "../requests.js";
import Room from "../components/Room.js";
import { Table } from "react-bootstrap";

const Roomlist = () => {

    const [rooms, setRooms] = useState([]);
    const [showAll, setShowAll] = useState(true);
  
    useEffect(() => {
      getRooms().then((res) => {
        setRooms(res);
      });
    }, []);
  
    const toggleReservedRoom = (id) => {
      const room = rooms.find((n) => n.id === id);
      const changedroom = { ...room, available: !room.available };
  
      updateRoom(id, changedroom).then((res) => {
        setRooms(rooms.map((room) => (room.id === id ? changedroom : room)));
      });
    };
  
    const roomsToShow = showAll ? rooms : rooms.filter((room) => room.available);
  
    return(
      <div>
         <Table striped>
          <thead>
            <tr>
              <th scope="col">Huoneen numero</th>
              <th scope="col">Henkilömäärä</th>
            </tr>
          </thead>
          <tbody>
            {roomsToShow.map((room) => (
              <Room
                room={room}
                toggleReserved={() => toggleReservedRoom(room.id)}
              />
            ))}
          </tbody>
        </Table>
      </div>
    )
  } 
  
export default Roomlist;  

