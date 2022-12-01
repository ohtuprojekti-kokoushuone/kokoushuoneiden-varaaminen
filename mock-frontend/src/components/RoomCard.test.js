import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import RoomCard from './RoomCard';
import { BrowserRouter } from 'react-router-dom';

describe('<RoomCard />', () => {
  let container;
  const mockClickHeart = jest.fn();
  const mockGetFavourite = jest.fn();

  beforeEach(() => {
    const testRoom = {
      available: true,
      building: 'Physicum',
      groups: Array['allstaff'],
      id: 'physicum.g237',
      name: 'Physicum, G237, Meeting room Ada (6)',
      size: 6
    };

    container = render(
      <BrowserRouter>
        <RoomCard room={testRoom} onHeartClick={mockClickHeart} getFavourite={mockGetFavourite} />
      </BrowserRouter>
    );
  });

  test('renders roomName, availability and "Varaa huone" button', () => {
    expect(container.container).toHaveTextContent('Physicum, G237, Meeting room Ada (6)');
    expect(container.container).toHaveTextContent('label.available');
    expect(container.container).toHaveTextContent('button.reserveRoom');
  });

  test('renders "Vapaa" if available', () => {
    expect(container.container).toHaveTextContent('label.available');
  });

  test('renders Varattu if not available', () => {
    const testRoom2 = {
      available: false,
      building: 'Physicum',
      groups: Array['allstaff'],
      id: 'physicum.g237',
      name: 'Physicum, G237, Meeting room Ada (6)',
      size: 6
    };

    const container2 = render(
      <BrowserRouter>
        <RoomCard room={testRoom2} onHeartClick={mockClickHeart} getFavourite={mockGetFavourite} />
      </BrowserRouter>
    );

    expect(container2.container).toHaveTextContent('label.notAvailable');
  });
});
