export type Person = {
  email: string;
  name: string;
};

export type ReservationObject = {
  subject: string;
  start: Date;
  end: Date;
  attendees?: Person[];
};

export type ReservationResponse = {
  id: string;
  subject: string;
  start: {
    dateTime: Date | string;
    timeZone: string;
  };
  end:
    | string
    | {
        dateTime: Date | string;
        timeZone: string;
      };
  organizer: Person;
  attendees: Person[];
  isCancelled: boolean;
};

export type GetReservationsResponse = {
  count: number;
  reservations: ReservationResponse[];
};

export type Room = {
  name: string;
  address: string;
  id: string;
  building: string;
  roomId: number;
};
