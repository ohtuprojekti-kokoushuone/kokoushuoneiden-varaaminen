import axios from "axios";
import { ReservationObject, Room } from "./types/common";

export function getRooms() {
  const req = axios.get("http://localhost:3003/rooms");
  return req.then((res) => res.data);
}

export function getReservations(room: Room, today: boolean = false) {
  const req = axios.get(
    `http://localhost:3003/reservations/${room}?today=${today}`);
  return req.then((res) => res.data);
}

export function makeReservation(room: Room, reservation: ReservationObject) {
  const req = axios.post(`http://localhost:3003/reservations/${room}`, reservation)
  return req.then(res => res.data).catch(error => { throw new Error(error.message) })
}

export function deleteReservation(room: Room, reservationId: string) {
  const req = axios.delete(`http://localhost:3003/reservations/${room}/${reservationId}`)
  return req.then(res => res.data)
}

export function updateReservation(room: Room, reservationId: string, updatedObj: Record<any, any>) {
  const req = axios.patch(`http://localhost:3003/reservations/${room}/${reservationId}`, updatedObj)
  return req.then(res => res.data)
}

export function checkAvailability(room: Room, start: Date, end: Date) {
  const req = axios.post(`http://localhost:3003/reservations/${room}/availability`, { start: start, end: end })
  return req.then(res => {
    return res.data
  })
}