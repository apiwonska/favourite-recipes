import { render, screen } from '@testing-library/react';
import PageLayout from './PageLayout';

it('renders layout', () => {
  render(<PageLayout children="App" />);

  const header = screen.getByRole('banner');
  const main = screen.getByRole('main');
  const footer = screen.getByRole('contentinfo');

  expect(header).toBeInTheDocument();
  expect(main).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});
