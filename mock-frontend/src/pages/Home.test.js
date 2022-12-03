import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { getBuildings, getRoomsInfo } from '../requests';

jest.mock('../requests');

describe('<Home />', () => {
  describe('filter button', () => {
    let button;

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

      getBuildings.mockResolvedValue({
        data: [
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
          },
          {
            name: 'Kumpula Campus Library'
          }
        ]
      });

      render(<Home />, { wrapper: BrowserRouter });

      button = await screen.findByTestId('filter-btn');
    });

    test('Link button to /choosetime is rendered', async () => {
      expect(button).toBeInTheDocument();
    });

    test('Href of Link is /choosetime', async () => {
      expect(button).toHaveAttribute('href', '/choosetime');
    });
  });
});
