import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import NavigationBar from './NavigationBar';

describe('<Navigationbar />', () => {
  test('render navigationbar correctly', () => {
    const container2 = render(<NavigationBar />);

    expect(container2.container).toHaveTextContent('label.reservations');
    expect(container2.container).toHaveTextContent('label.chooseTime');
    expect(container2.container).toHaveTextContent('button.logout');
  });
});
