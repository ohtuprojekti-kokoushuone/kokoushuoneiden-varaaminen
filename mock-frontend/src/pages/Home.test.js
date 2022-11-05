import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios');

describe('<Home />', () => {
  describe('"Rajaa tarkemmin" button', () => {
    let button;

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
        render(<Home />, { wrapper: BrowserRouter });
      });

      button = screen.getByRole('link', { name: /Rajaa tarkemmin/i });
    });

    test('Link button to /choosetime is rendered', async () => {
      expect(button).toBeInTheDocument();
    });

    test('Href of Link is /choosetime', async () => {
      expect(button).toHaveAttribute('href', '/choosetime');
    });
  });
});
