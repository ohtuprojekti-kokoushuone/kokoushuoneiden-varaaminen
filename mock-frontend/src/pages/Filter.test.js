import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Filter from './Filter';
import * as Requests from '../requests';

describe('<Filter />', () => {
  const obj = [
    {
      name: 'Kumpula',
      buildings: [
        {
          name: 'Chemicum',
          rooms: []
        }
      ]
    },
    {
      name: 'Keskusta',
      buildings: []
    },
    {
      name: 'Viikki',
      buildings: []
    },
    {
      name: 'Meilahti',
      buildings: []
    }
  ];

  const spy = jest.spyOn(Requests, 'getCampuses');

  beforeEach(() => {
    spy.mockResolvedValue(obj);
  });

  test('render filter', async () => {
    render(<Filter />);
    const expectedCampus = obj[0].name;

    expect(screen.findByText(expectedCampus)).toBeDefined();
  });
});
