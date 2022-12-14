import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { getCurrentDateStr, getDateStrInNMin } from '../tests/test_helper';
import ChooseTime from './ChooseTime';
import { getCampuses, getRoomsInfo, getFavourites } from '../requests';

jest.mock('../requests');

describe('<ChooseTime />', () => {
  beforeEach(async () => {
    getRoomsInfo.mockResolvedValue({
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

    getCampuses.mockResolvedValue({
      data: [
        {
          name: 'Kumpula'
        },
        {
          name: 'Keskusta'
        },
        {
          name: 'Viikki'
        },
        {
          name: 'Meilahti'
        }
      ]
    });

    getFavourites.mockResolvedValue([]);

    render(<ChooseTime />);

    await screen.findByText('chooseStart');
  });

  test('Starting time is set to current time', () => {
    const startDate = screen.getByTestId('start-date');
    expect(startDate.value).toBe(getCurrentDateStr());
  });

  test('Ending time is set to current time', () => {
    const endDate = screen.getByTestId('end-date');
    expect(endDate.value).toBe(getDateStrInNMin(60));
  });
});
