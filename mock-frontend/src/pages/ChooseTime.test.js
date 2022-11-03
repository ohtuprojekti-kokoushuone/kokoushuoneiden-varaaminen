import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ChooseTime from './ChooseTime';

describe('<ChooseTime />', () => {
  beforeEach(() => {
    render(<ChooseTime />);
  });

  test('Starting time is set to current time', () => {
    const startDate = screen.getByTestId('start-date');
    const currentDate = new Date().toLocaleString().replaceAll('/', '.').replace(',', '').slice(0, 16);
    expect(startDate.value).toBe(currentDate);
  });

  test('Ending time is set to current time', () => {
    const endDate = screen.getByTestId('end-date');
    const currentDate = new Date().toLocaleString().replaceAll('/', '.').replace(',', '').slice(0, 16);
    expect(endDate.value).toBe(currentDate);
  });
});
