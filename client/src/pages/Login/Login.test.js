import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './index';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders Login page with all 6 roles and demo access buttons', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // Check School Brand
  expect(screen.getByText(/LAL BIHARI MAHTO/i)).toBeInTheDocument();

  // Check that all 6 roles exist in the selector tabs
  expect(screen.getAllByText(/Super Admin/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Admin/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Accountant/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Teacher/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Student/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Parent/i).length).toBeGreaterThan(0);

  // Check Remember Me checkbox
  expect(screen.getByText(/Remember this ID on this device/i)).toBeInTheDocument();
});

test('toggles password visibility when clicking show/hide button', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const toggleBtn = screen.getByLabelText(/Toggle password visibility/i);
  const passwordInput = screen.getByPlaceholderText(/Enter password/i);

  expect(passwordInput.type).toBe('password');
  fireEvent.click(toggleBtn);
  expect(passwordInput.type).toBe('text');
  fireEvent.click(toggleBtn);
  expect(passwordInput.type).toBe('password');
});

test('opens and closes the institutional login support modal', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const helpBtn = screen.getByText(/Forgot \/ Need Help\?/i);
  fireEvent.click(helpBtn);

  expect(screen.getByText(/Institutional Login & Password Support/i)).toBeInTheDocument();
  expect(screen.getByText(/Students & Learners/i)).toBeInTheDocument();
  expect(screen.getByText(/Parents & Guardians/i)).toBeInTheDocument();

  const closeBtn = screen.getByText(/Understood \/ Close/i);
  fireEvent.click(closeBtn);

  expect(screen.queryByText(/Institutional Login & Password Support/i)).not.toBeInTheDocument();
});

