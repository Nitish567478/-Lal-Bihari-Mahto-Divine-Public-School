import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders app without crashing', () => {
  render(<App />);
  expect(document.body).toBeTruthy();
});


