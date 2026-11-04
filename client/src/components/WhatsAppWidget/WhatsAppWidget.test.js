import React from 'react';
import { render, screen } from '@testing-library/react';
import WhatsAppWidget from './index';

test('renders WhatsApp and direct call widget with 9162789001', () => {
  render(<WhatsAppWidget />);

  // Check phone number digits displayed
  expect(screen.getByText('9162789001')).toBeInTheDocument();

  // Check WhatsApp link
  const waLink = screen.getByLabelText(/Chat with school admissions on WhatsApp/i);
  expect(waLink).toBeInTheDocument();
  expect(waLink).toHaveAttribute('href', expect.stringContaining('9162789001'));

  // Check Phone call link
  const callLink = screen.getByTitle(/Call 9162789001/i);
  expect(callLink).toBeInTheDocument();
  expect(callLink).toHaveAttribute('href', 'tel:+919162789001');
});

