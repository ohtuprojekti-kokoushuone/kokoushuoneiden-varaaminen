import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { getRoomsInfo, getBuildings, getFavourites } from './requests';
import App from './App';

jest.mock('./requests');

describe('App component', () => {
  it('renders', () => {
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
      data: ['physicum', 'exactum']
    });
    getFavourites.mockResolvedValue([]);
    expect(() => render(<App />)).not.toThrow();
  });
});
