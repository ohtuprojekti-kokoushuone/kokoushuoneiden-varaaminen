import axios from 'axios';
import { ReservationObject, Room } from './types/common';

export function setToken(newToken: any) {
  const token = `bearer ${newToken}`;
  return token;
}

export async function login(credentials: any) {
  const res = await axios.post('http://localhost:3003/login', credentials);
  return res.data;
}

const test = 'test';

export function getRooms() {
  const req = axios.get('http://localhost:3003/rooms');
  return req.then((res) => res.data);
}

export function getRoomsInfo() {
  const req = axios.get('http://localhost:3003/roomsInfo');
  return req.then((res) => res.data);
}

export function getReservations(room: Room, today = false) {
  const req = axios.get(`http://localhost:3003/reservations/${room}?today=${today}`);
  return req.then((res) => res.data);
}

export function makeReservation(room: Room, reservation: ReservationObject) {
  const req = axios.post(`http://localhost:3003/reservations/${room}`, reservation);
  return req
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export function deleteReservation(room: Room, reservationId: string) {
  const req = axios.delete(`http://localhost:3003/reservations/${room}/${reservationId}`);
  return req.then((res) => res.data);
}

export function updateReservation(room: Room, reservationId: string, updatedObj: Record<any, any>) {
  const req = axios.patch(`http://localhost:3003/reservations/${room}/${reservationId}`, updatedObj);
  return req.then((res) => res.data);
}

export function checkAvailability(room: Room, start: Date, end: Date) {
  const req = axios.post(`http://localhost:3003/reservations/${room}/availability`, { start: start, end: end });
  return req.then((res) => {
    return res.data;
  });
}

export function getRoomById(id: Room) {
  const req = axios.get(`http://localhost:3003/rooms/${id}`);
  return req.then((res) => {
    return res.data;
  });
}
