import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { getCurrentDateStr, getDateStrInNMin } from '../tests/test_helper';
import CreateReservation from './CreateReservation';

describe('<CreateReservation />', () => {
  beforeEach(() => {
    render(<CreateReservation />);
  });

  test('Starting time is set to current time', () => {
    const startDate = screen.getByTestId('start-date-reservation');
    expect(startDate.value).toBe(getCurrentDateStr());
  });

  test('Ending time is set one hour later from the current time', () => {
    const endDate = screen.getByTestId('end-date-reservation');
    expect(endDate.value).toBe(getDateStrInNMin(60));
  });
});
