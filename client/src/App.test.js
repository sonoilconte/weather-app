import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Weather text', () => {
  render(<App />);
  const text = screen.getByText(/Weather/i);
  expect(text).toBeInTheDocument();
});
