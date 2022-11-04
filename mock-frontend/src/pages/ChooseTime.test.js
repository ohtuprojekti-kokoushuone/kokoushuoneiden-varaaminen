import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import { getCurrentDateStr } from '../tests/test_helper';
import ChooseTime from './ChooseTime';

jest.mock('axios');

describe('<ChooseTime />', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          available: true,
          building: 'Testirakennus',
          groups: [],
          id: 'testirakennus.2001',
          name: 'Testirakennus, 2001, Kokoushuone 1',
          size: null
        }
      ]
    });

    await act(async () => {
      render(<ChooseTime />);
    });
  });

  test('Starting time is set to current time', () => {
    const startDate = screen.getByTestId('start-date');
    expect(startDate.value).toBe(getCurrentDateStr());
  });

  test('Ending time is set to current time', () => {
    const endDate = screen.getByTestId('end-date');
    expect(endDate.value).toBe(getCurrentDateStr());
  });
});
