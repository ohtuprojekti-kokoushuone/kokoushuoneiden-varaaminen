import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import CreateReservation from './CreateReservation';

describe('<CreateReservation />', () => {
  beforeEach(() => {
    render(<CreateReservation />);
  });

  test('input "Syötä aihe" should be empty at first', () => {
    const inputElement = screen.getByPlaceholderText(/Syötä aihe/i);
    expect(inputElement.value).toBe('');
  });

  test('Starting time is set to current time', () => {
    const startDate = screen.getByTestId('start-date-reservation');
    const currentDate = new Date().toLocaleString().replaceAll('/', '.').replace(',', '').slice(0, 16);
    expect(startDate.value).toBe(currentDate);
  });

  test('Ending time is set one hour later from the current time', () => {
    Date.prototype.addHours = function (h) {
      this.setTime(this.getTime() + h * 60 * 60 * 1000);
      return this;
    };

    const endDate = screen.getByTestId('end-date-reservation');
    const currentDate = new Date();
    const oneHourLaterFromCurrent = currentDate
      .addHours(1)
      .toLocaleString()
      .replaceAll('/', '.')
      .replace(',', '')
      .slice(0, 16);
    expect(endDate.value).toBe(oneHourLaterFromCurrent);
  });
});
