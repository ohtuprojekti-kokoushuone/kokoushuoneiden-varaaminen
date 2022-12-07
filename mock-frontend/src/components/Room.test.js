import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Room from './Room';

describe('<Room />', () => {
  const testRoom = {
    available: true,
    building: 'Physicum',
    groups: ['allstaff'],
    id: 'physicum.g237',
    name: 'Physicum, G237, Meeting room Ada (6)',
    size: 6,
    maxTime: 120
  };

  const container = render(<Room room={testRoom} />);
  test('renders roomName, roomEmail and roomSize', () => {
    expect(container.container).toHaveTextContent('Physicum, G237, Meeting room Ada (6)');
    expect(container.container).toHaveTextContent('label.building: Physicum');
    expect(container.container).toHaveTextContent('label.size: 6 unit.people');
    expect(container.container).toHaveTextContent('label.maxtime: 120 min');
    expect(container.container).toHaveTextContent('label.usergroup: allstaf');
  });
});
