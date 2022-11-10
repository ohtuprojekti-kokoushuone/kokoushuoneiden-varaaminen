import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import Filter from './Filter';
import * as Requests from '../requests';

describe('<Filter />', () => {
  const obj = [
    {
      name: 'Testirakennus'
    },
    {
      name: 'Exactum'
    },
    {
      name: 'Physicum'
    },
    {
      name: 'Chemicum'
    }
  ];

  jest.spyOn(Requests, 'getBuildings').mockResolvedValue(obj);

  render(<Filter />);

  test('Filtering buttons are rendered', async () => {
    await waitFor(() => screen.getAllByRole('button'));

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveTextContent('Testirakennus');
    expect(buttons[1]).toHaveTextContent('Exactum');
    expect(buttons[2]).toHaveTextContent('Physicum');
    expect(buttons[3]).toHaveTextContent('Chemicum');
  });
});
