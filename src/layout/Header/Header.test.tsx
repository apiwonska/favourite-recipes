import { render, screen } from '@testing-library/react';
import Header from './Header';

it('renders header', () => {
  render(<Header />);
  const header = screen.getByRole('banner');
  const appName = screen.getByText(/favorite recipes/i);
  const logo = screen.getByTestId('logo');
  expect(header).toBeInTheDocument();
  expect(appName).toBeInTheDocument();
  expect(logo).toBeInTheDocument();
});
