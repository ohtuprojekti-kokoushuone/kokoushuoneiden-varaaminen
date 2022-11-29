import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import NavigationBar from './NavigationBar';

describe('<Navigationbar />', () => {
  test('render tabs when user is logged in', () => {
    const user = { token: 'testToken', username: 'tester' };

    const container2 = render(<NavigationBar user={user} />);

    expect(container2.container).toHaveTextContent('label.reservations');
    expect(container2.container).toHaveTextContent('label.chooseTime');
    expect(container2.container).toHaveTextContent('button.logout');
  });
});
