import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Reservation from './Reservation';

describe('<Reservation />', () => {
  let component;

  beforeEach(() => {
    const res = {
      attendees: [],
      body: { contentType: 'text', content: '' },
      end: { dateTime: '2022-11-11T01:00:00.000Z', timeZone: 'UTC' },
      id: 'test',
      organizer: { email: 'testirakennus.2001@helsinki.fi', name: 'Testirakennus, 2001, Kokoushuone 1' },
      start: { dateTime: '2022-11-11T00:00:00.000Z', timeZone: 'UTC' },
      subject: 'test'
    };
    component = render(<Reservation res={res} />);
  });

  test('Render subject, organizer name, start date and end date', () => {
    expect(component.container).toHaveTextContent('test');
    expect(component.container).toHaveTextContent('Testirakennus, 2001, Kokoushuone 1');
    expect(component.container).toHaveTextContent('11.11.2022 2.00.00');
    expect(component.container).toHaveTextContent('11.11.2022 3.00.00');
  });
});
