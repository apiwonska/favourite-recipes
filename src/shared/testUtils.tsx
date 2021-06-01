/* eslint-disable react/jsx-props-no-spreading */

import { MemoryRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

export const TestWrapper: React.FC = ({ children }) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

export const getString = (len: number): string => {
  let str = '';
  for (let i = 0; i <= len; i += 1) {
    str += 'l';
  }
  return str;
};
