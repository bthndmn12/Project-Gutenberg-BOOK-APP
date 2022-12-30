import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from '../App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders correctly and all child components are present', () => {
  act(() => {
    render(<App />, container);
  });

  expect(container.getElementsByClassName('../Navbar')).toBeTruthy();
  expect(container.getElementsByClassName('../BookCard')).toBeTruthy();
  expect(container.getElementsByClassName('../Favorites')).toBeTruthy();
});
