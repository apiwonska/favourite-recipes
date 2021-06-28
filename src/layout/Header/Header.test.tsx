import { render, screen } from '@testing-library/react';

import { TestWrapper } from 'shared/testUtils';
import Header from './Header';

const WrappedHeader: React.FC = () => (
  <TestWrapper>
    <Header />
  </TestWrapper>
);
it('renders header', () => {
  render(<WrappedHeader />);
  const header = screen.getByRole('banner');
  const appName = screen.getAllByTestId('app-name');
  expect(header).toBeInTheDocument();
  expect(appName).toHaveLength(2);
});
