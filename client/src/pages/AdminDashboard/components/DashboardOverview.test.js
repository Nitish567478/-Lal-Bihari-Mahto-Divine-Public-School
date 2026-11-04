import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';

const localDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

test('shows dashboard metrics from the supplied school records', () => {
  const setActivePanel = jest.fn();
  const today = localDateKey(new Date());
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);

  render(
    <MemoryRouter>
      <DashboardOverview
        attendanceData={[
          { id: 'present-1', date: today, className: 'Class 10', present: true },
          { id: 'absent-1', date: today, className: 'Class 10', absent: true },
        ]}
        studentsData={[{ id: 'student-1' }, { id: 'student-2' }]}
        teachersData={[{ id: 'teacher-1' }]}
        staffData={[]}
        feesData={[
          { id: 'fee-due', status: 'Unpaid', amount: 1250 },
          { id: 'fee-paid', status: 'Paid', amount: 900 },
        ]}
        examsData={[{ id: 'exam-1', examName: 'Term exam', date: localDateKey(futureDate) }]}
        setActivePanel={setActivePanel}
        handleSaveAll={jest.fn()}
      />
    </MemoryRouter>
  );

  expect(screen.getByText('Enrolled Students')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('Faculty & Staff')).toBeInTheDocument();
  expect(screen.getByText('Term exam')).toBeInTheDocument();
  expect(screen.getByText('Class 10')).toBeInTheDocument();
  expect(screen.getByText('1 present')).toBeInTheDocument();
  expect(screen.getByText('1 absent')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /Open register/i }));
  expect(setActivePanel).toHaveBeenCalledWith('attendance');
});

test('shows empty-state attendance instead of fabricated counts', () => {
  render(
    <MemoryRouter>
      <DashboardOverview
        attendanceData={[]}
        studentsData={[]}
        teachersData={[]}
        feesData={[]}
        examsData={[]}
        setActivePanel={jest.fn()}
        handleSaveAll={jest.fn()}
      />
    </MemoryRouter>
  );

  expect(screen.getByText('Today\'s Attendance')).toBeInTheDocument();
  expect(screen.getByText('No attendance has been recorded today.')).toBeInTheDocument();
});
