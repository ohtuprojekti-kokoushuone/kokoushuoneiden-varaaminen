import { ReservationObject, Room } from './types/common';
import api from './utils/api';

export async function login(credentials: any) {
  const res = await api.post('/login', credentials);
  return res.data;
}

export function getRooms() {
  const req = api.get('/rooms');
  return req.then((res) => res.data);
}

export function getBuildings() {
  const req = api.get('/rooms/buildings');
  return req.then((res) => res.data);
}

export function getRoomsInfo() {
  const req = api.get('/rooms/info');
  return req.then((res) => {
    return res.data;
  });
}

export function getReservations(room: Room, today = false) {
  const req = api.get(`/reservations/${room}?today=${today}`);
  return req.then((res) => res.data);
}

export function makeReservation(room: Room, reservation: ReservationObject) {
  const req = api.post(`/reservations/${room}`, reservation);
  return req
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

export function deleteReservation(room: Room, reservationId: string) {
  const req = api.delete(`/reservations/${room}/${reservationId}`);
  return req.then((res) => res.data);
}

export function updateReservation(room: Room, reservationId: string, updatedObj: Record<any, any>) {
  const req = api.patch(`/reservations/${room}/${reservationId}`, updatedObj);
  return req.then((res) => res.data)
}

export function editReservation(room: Room, reservationId: string, reservation: ReservationObject) {
  const req = api.put(`/reservations/${room}/${reservationId}`, reservation);
  return req
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.response.data.message);
    });
}

export function checkAvailability(room: Room, start: Date, end: Date) {
  const req = api.post(`/reservations/${room}/availability`, { start: start, end: end });
  return req.then((res) => {
    return res.data;
  });
}

export function getRoomById(id: Room) {
  const req = api.get(`/rooms/${id}`);
  return req.then((res) => {
    return res.data;
  });
}

export function getOwnReservations() {
  const req = api.get('/users/reservations');
  return req.then((res) => {
    return res.data;
  });
}

export function getCurrentUser() {
  const req = api.get('/users/current');
  return req.then((res) => {
    return res.data;
  });
}

export function getFavourites() {
  const req = api.get('/users/favourites');
  return req.then((res) => {
    return res.data;
  });
}

export function updateFavourites(favourites: Array<string>) {
  const req = api.post('/users/favourites', favourites);
  return req.then((res) => {
    return res.data;
  });
}
