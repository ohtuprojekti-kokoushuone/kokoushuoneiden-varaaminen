import axios from 'axios';
import { ReservationObject, Room } from './types/common';

const PUBLIC_URL = process.env.PUBLIC_URL;

export function setToken(newToken: any) {
  const token = `bearer ${newToken}`;
  return token;
}

export async function login(credentials: any) {
  const res = await axios.post(`${PUBLIC_URL}:3003/api/login`, credentials);
  return res.data;
}

export function getRooms() {
  const req = axios.get(`${PUBLIC_URL}:3003/api/rooms`);
  return req.then((res) => res.data);
}

export function getRoomsInfo() {
  const req = axios.get(`${PUBLIC_URL}:3003/api/rooms/info`);
  return req.then((res) => res.data);
}

export function getReservations(room: Room, today = false) {
  const req = axios.get(`${PUBLIC_URL}:3003/api/reservations/${room}?today=${today}`);
  return req.then((res) => res.data);
}

export function makeReservation(room: Room, reservation: ReservationObject) {
  const req = axios.post(`${PUBLIC_URL}:3003/api/reservations/${room}`, reservation);
  return req
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

export function deleteReservation(room: Room, reservationId: string) {
  const req = axios.delete(`${PUBLIC_URL}:3003/api/reservations/${room}/${reservationId}`);
  return req.then((res) => res.data);
}

export function updateReservation(room: Room, reservationId: string, updatedObj: Record<any, any>) {
  const req = axios.patch(`${PUBLIC_URL}:3003/api/reservations/${room}/${reservationId}`, updatedObj);
  return req.then((res) => res.data);
}

export function checkAvailability(room: Room, start: Date, end: Date) {
  const req = axios.post(`${PUBLIC_URL}:3003/api/reservations/${room}/availability`, { start: start, end: end });
  return req.then((res) => {
    return res.data;
  });
}

export function getRoomById(id: Room) {
  const req = axios.get(`${PUBLIC_URL}:3003/api/rooms/${id}`);
  return req.then((res) => {
    return res.data;
  });
}
