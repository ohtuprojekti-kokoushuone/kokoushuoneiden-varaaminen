import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Filter from './Filter';

describe('<Filter />', () => {
  let component;

  component = render(<Filter />);

  test('Filtering buttons are rendered', () => {
    expect(component.container).toHaveTextContent('Testirakennus');
    expect(component.container).toHaveTextContent('Exactum');
    expect(component.container).toHaveTextContent('Physicum');
    expect(component.container).toHaveTextContent('Chemicum');
  });
});
