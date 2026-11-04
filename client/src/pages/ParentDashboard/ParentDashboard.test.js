import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ParentDashboard from './index';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders ParentDashboard without crashing and displays multi-child selector and tabs', () => {
  render(
    <MemoryRouter>
      <ParentDashboard isDemoMode={true} />
    </MemoryRouter>
  );

  // Checks for school title & parent name
  expect(screen.getByText(/LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Sunil Kumar/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Aarav Kumar/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Ananya Kumar/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Daily Attendance/i)).toBeInTheDocument();
  expect(screen.getByText(/Academic Progress/i)).toBeInTheDocument();
  expect(screen.getByText(/Fee Ledger & Dues/i)).toBeInTheDocument();
});

