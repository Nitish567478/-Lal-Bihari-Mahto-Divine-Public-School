import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudentDashboard from './index';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders StudentDashboard without crashing and displays header and default tabs', () => {
  render(
    <MemoryRouter>
      <StudentDashboard isDemoMode={true} />
    </MemoryRouter>
  );

  // Checks for school title & student name
  expect(screen.getByText(/LAL BIHARI MAHTO DIVINE PUBLIC SCHOOL/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Aarav Kumar/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Class Schedule/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Assignments/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Grades & Reports/i)).toBeInTheDocument();
});

