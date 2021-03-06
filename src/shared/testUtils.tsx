/* eslint-disable react/jsx-props-no-spreading */

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { QueryClientProvider, QueryClient } from 'react-query';

interface ITestWrapperProps {
  children: React.ReactNode;
  route?: string;
}

const history = createMemoryHistory();

export const TestWrapper: React.FC<ITestWrapperProps> = ({
  children,
  route,
}) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 1,
        retry: 0,
      },
    },
  });

  if (route) {
    history.push(route);
  }

  return (
    <QueryClientProvider client={client}>
      <Router history={history}>{children}</Router>
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

export const getUrl = (path: string): string => `/.netlify/functions${path}`;
