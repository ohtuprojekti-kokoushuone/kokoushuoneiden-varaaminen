import axios from "axios";

export function getRooms() {
  const req = axios.get("http://localhost:3003/rooms");
  return req.then((res) => res.data);
}

export function getReservations(room, today = false) {
  const req = axios.get(
    `http://localhost:3003/reservations/${room}`,
    JSON.stringify({ body: { today: today } })
  );
  return req.then((res) => res.data);
}

export function updateRoom(id, updatedObj) {
  const req = axios.put(`http://localhost:3003/rooms/${id}`, updatedObj);
  return req.then((res) => res);
}
