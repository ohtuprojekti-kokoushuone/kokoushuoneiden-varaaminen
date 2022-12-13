import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import Filter from './Filter';
import * as Requests from '../requests';
import { Accordion } from 'semantic-ui-react';

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
  jest.spyOn(Requests, 'getBuildings').mockResolvedValue(obj);
  render(<Filter />);

  test('render filter', () => {
    const container1 = render(<Filter />);

    expect(container1.container).toHaveTextContent('Kumpula');
  });
});
