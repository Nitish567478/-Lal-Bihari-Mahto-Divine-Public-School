import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AIAssistant from './index';

test('renders school logo launcher button and toggles AI chatbot on click', () => {
  render(<AIAssistant />);

  // Circular School Logo Launcher button should be rendered
  const launcherBtn = screen.getByRole('button', { name: /Open 24\/7 AI Admissions Assistant/i });
  expect(launcherBtn).toBeInTheDocument();

  // Launcher contains only the school crest image
  const logoImg = screen.getByAltText(/LBMDPS Crest/i);
  expect(logoImg).toBeInTheDocument();

  // Clicking launcher opens the modern AI Bot window
  fireEvent.click(launcherBtn);

  // Modern AI Chatbot Header and Greeting should now be visible
  expect(screen.getAllByText(/LBMDPS Admissions AI/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/24\/7 LIVE/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Fee Structure 2026/i)[0]).toBeInTheDocument();

  // Clicking close button minimizes the chatbot back to the logo launcher
  const closeBtn = screen.getByTitle(/Minimize AI Assistant/i);
  fireEvent.click(closeBtn);

  expect(screen.getByRole('button', { name: /Open 24\/7 AI Admissions Assistant/i })).toBeInTheDocument();
});
