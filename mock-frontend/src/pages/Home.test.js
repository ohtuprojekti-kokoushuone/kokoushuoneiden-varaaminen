import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

describe('<Home />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test('Filter component is rendered', () => {
    expect(component.container).toHaveTextContent('Testirakennus');
    expect(component.container).toHaveTextContent('Exactum');
    expect(component.container).toHaveTextContent('Physicum');
    expect(component.container).toHaveTextContent('Chemicum');
  });

  describe('"Rajaa tarkemmin" button', () => {
    let button;

    beforeEach(() => {
      button = screen.getByRole('link', {
        name: /Rajaa tarkemmin/i
      });
    });

    test('Link button to /choosetime is rendered', () => {
      expect(button).toBeInTheDocument();
    });

    test('Href of Link is /choosetime', () => {
      expect(button).toHaveAttribute('href', '/choosetime');
    });
  });
});
