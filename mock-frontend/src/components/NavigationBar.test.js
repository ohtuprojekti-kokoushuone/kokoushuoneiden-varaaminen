import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import NavigationBar from './NavigationBar';

describe('<Navigationbar />', () => {
  test('does not render tabs when user is not logged in', () => {
    const container = render(<NavigationBar user={null} />);

    expect(container.container).not.toHaveTextContent('Omat varaukset');
    expect(container.container).not.toHaveTextContent('Valitse aika');
    expect(container.container).not.toHaveTextContent('Kirjaudu ulos');
  });

  test('render tabs when user is logged in', () => {
    const user = { token: 'testToken', username: 'tester' };

    const container2 = render(<NavigationBar user={user} />);

    expect(container2.container).toHaveTextContent('Omat varaukset');
    expect(container2.container).toHaveTextContent('Valitse aika');
    expect(container2.container).toHaveTextContent('Kirjaudu ulos');
  });
});
