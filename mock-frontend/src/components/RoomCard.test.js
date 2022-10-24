import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoomCard from './RoomCard';
import { useNavigate, BrowserRouter } from 'react-router-dom';

describe('<RoomCard />', () => {
  let container;

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
        <RoomCard room={testRoom} />
      </BrowserRouter>
    );
  });

  test('renders roomId, roomName and "Varaa huone" button', () => {
    expect(container.container).toHaveTextContent('physicum.g237');
    expect(container.container).toHaveTextContent('Physicum, G237, Meeting room Ada (6)');
    expect(container.container).toHaveTextContent('Varaa huone');
  });

  test('renders "Vapaa" if available', () => {
    expect(container.container).toHaveTextContent('Vapaa');
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
        <RoomCard room={testRoom2} />
      </BrowserRouter>
    );

    expect(container2.container).toHaveTextContent('Varattu');
  });
});
