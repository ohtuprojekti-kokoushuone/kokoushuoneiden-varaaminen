import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import { getCurrentDateStr, getDateStrInNMin } from '../tests/test_helper';
import CreateReservation from './CreateReservation';
import { getRoomById, getCurrentUser } from '../requests';

jest.mock('../requests');

describe('<CreateReservation />', () => {
  beforeEach(async () => {
    getRoomById.mockResolvedValue({
      building: 'Testirakennus',
      groups: [],
      id: 'testirakennus.2001',
      maxTime: 120,
      name: 'Testirakennus, 2001, Kokoushuone 1',
      size: 6
    });
    getCurrentUser.mockResolvedValue({
      givenName: 'Kalle',
      sn: 'Ilves'
    });

    await act(async () => render(<CreateReservation />));
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
