import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('App component', () => {
  test('renders', async () => {
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
    expect(() => render(<App />)).not.toThrow();
  });
});
