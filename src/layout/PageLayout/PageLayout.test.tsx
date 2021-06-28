import { render, screen } from '@testing-library/react';

import { TestWrapper } from 'shared/testUtils';
import PageLayout from './PageLayout';

const WrappedPageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TestWrapper>
    <PageLayout children={children} />
  </TestWrapper>
);

it('renders layout', () => {
  render(<WrappedPageLayout children="App" />);

  const header = screen.getByRole('banner');
  const main = screen.getByRole('main');
  const footer = screen.getByRole('contentinfo');

  expect(header).toBeInTheDocument();
  expect(main).toBeInTheDocument();
  expect(footer).toBeInTheDocument();
});
