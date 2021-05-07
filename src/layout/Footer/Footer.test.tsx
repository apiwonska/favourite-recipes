import { render, screen } from '@testing-library/react';
import Footer from './Footer';

it('renders footer', () => {
  render(<Footer />);
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();
});
