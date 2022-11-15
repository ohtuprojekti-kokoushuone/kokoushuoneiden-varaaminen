import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Reservation from './Reservation';

describe('<Reservation />', () => {
  let res;

  beforeEach(() => {
    //ignore warning: validateDOMNesting(...): <tr> cannot appear as a child of <div>
    //since <tr> needs to be wrapped with <tbody> and it's done in Reservations.js
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    res = {
      attendees: [],
      body: { contentType: 'text', content: '' },
      end: { dateTime: '2022-11-11T01:00:00.000Z', timeZone: 'UTC' },
      id: 'test',
      organizer: { email: 'testirakennus.2001@helsinki.fi', name: 'Testirakennus, 2001, Kokoushuone 1' },
      start: { dateTime: '2022-11-11T00:00:00.000Z', timeZone: 'UTC' },
      subject: 'test'
    };
    render(<Reservation res={res} />);
  });

  test('Render subject, organizer name, start date and end date', () => {
    const cells = screen.getAllByRole('cell');
    const dateFormatOption = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    const subject = cells[0];
    expect(subject.textContent).toBe('test');

    const organizer = cells[1];
    expect(organizer.textContent).toBe('Testirakennus, 2001, Kokoushuone 1');

    const startDate = cells[2];
    expect(startDate.textContent).toBe(new Date(res.start.dateTime).toLocaleString('fi-FI', dateFormatOption));

    const endDate = cells[3];
    expect(endDate.textContent).toBe(new Date(res.end.dateTime).toLocaleString('fi-FI', dateFormatOption));
  });
});
