import axios from "axios";
import { GetReservationsResponse, ReservationObject, ReservationResponse, Room } from "./types/common";

export function getRooms() {
  const req = axios.get("http://localhost:3003/rooms");
  return req.then((res) => res.data);
}

export function getReservations(room: Room, today: boolean = false) {
  const req = axios.get(
    `http://localhost:3003/reservations/${room}?today=${today}`);
  return req.then((res) => {
    const data: GetReservationsResponse = res.data
    return data
  });
}

export function updateRoom(id: any, updatedObj: any) {
  const req = axios.put(`http://localhost:3003/rooms/${id}`, updatedObj);
  return req.then((res) => res);
}

export function makeReservation(room: Room, reservation: ReservationObject) {
  const req = axios.post(`http://localhost:3003/reservations/${room}`, {
    body: { reservation: JSON.stringify(reservation) }
  })
  return req.then(res => {
    const data: ReservationResponse = res.data
    return data
  }).catch(error => { throw new Error(error.message) })
}

export function deleteReservation(room: Room, reservationId: string) {
  const req = axios.delete(`http://localhost:3003/reservations/${room}/${reservationId}`)
  return req.then(res => res)
}

export function updateReservation(room: Room, reservationId: string, updatedObj: Record<any, any>) {
  const req = axios.patch(`http://localhost:3003/reservations/${room}/${reservationId}`)
  return req.then(res => {
    const data: ReservationResponse = res.data
    return data
  }
  )
}