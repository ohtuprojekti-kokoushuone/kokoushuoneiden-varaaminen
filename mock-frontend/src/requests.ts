import axios from 'axios';
import { ReservationObject, Room } from './types/common';
import { baseUrl } from './config';

export function setToken(newToken: any) {
  const token = `bearer ${newToken}`;
  return token;
}

export async function login(credentials: any) {
  const res = await axios.post(`${baseUrl}/login`, credentials);
  return res.data;
}

export function getRooms() {
  const req = axios.get(`${baseUrl}/rooms`);
  return req.then((res) => res.data);
}

export function getBuildings() {
  const req = axios.get(`${baseUrl}/rooms/buildings`);
  return req.then((res) => res.data);
}

export function getRoomsInfo() {
  const req = axios.get(`${baseUrl}/rooms/info`);
  return req.then((res) => res.data);
}

export function getReservations(room: Room, today = false) {
  const req = axios.get(`${baseUrl}/reservations/${room}?today=${today}`);
  return req.then((res) => res.data);
}

export function makeReservation(room: Room, reservation: ReservationObject) {
  const req = axios.post(`${baseUrl}/reservations/${room}`, reservation);
  return req
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

export function deleteReservation(room: Room, reservationId: string) {
  const req = axios.delete(`${baseUrl}/reservations/${room}/${reservationId}`);
  return req.then((res) => res.data);
}

export function updateReservation(room: Room, reservationId: string, updatedObj: Record<any, any>) {
  const req = axios.patch(`${baseUrl}/reservations/${room}/${reservationId}`, updatedObj);
  return req.then((res) => res.data);
}

export function checkAvailability(room: Room, start: Date, end: Date) {
  const req = axios.post(`${baseUrl}/reservations/${room}/availability`, { start: start, end: end });
  return req.then((res) => {
    return res.data;
  });
}

export function getRoomById(id: Room) {
  const req = axios.get(`${baseUrl}/rooms/${id}`);
  return req.then((res) => {
    return res.data;
  });
}
