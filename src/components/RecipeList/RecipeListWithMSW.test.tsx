import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';

import { testServerSetup, server, rest } from 'testServer';
import { url as apiUrl } from 'api';
import RecipeList from './RecipeList';

const queryCache = new QueryCache();
const RecipeListWithQueryClient = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <RecipeList />
    </QueryClientProvider>
  );
};

// Tests setup
testServerSetup();
afterEach(() => {
  queryCache.clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('RecipeList', () => {
  describe('while loading', () => {
    it('render spinner', () => {
      render(<RecipeListWithQueryClient />);
      const spinner = screen.getByText(/loading/i);
      const recipeTitle = screen.queryAllByText(/recipe title/i);
      expect(spinner).toBeInTheDocument();
      expect(recipeTitle).toHaveLength(0);
    });
  });

  // Problem: this test pass only when retry in react-query is set to false
  describe('while error', () => {
    it('display error message', async () => {
      // Switch off logging errors
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      server.use(
        rest.get(`${apiUrl}/recipes`, (req, res, ctx) =>
          res(ctx.status(500), ctx.json({ errorMessage: 'Test Error' }))
        )
      );
      // Render is intentionally after overwriting the handler. Moving it up results in using original handler
      render(<RecipeListWithQueryClient />);
      render(<RecipeListWithQueryClient />);

      const errorMessage = await screen.findByText(/error/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('fetch data successfuly', () => {
    it('renders a list of recipe cards correctly', async () => {
      render(<RecipeListWithQueryClient />);
      const recipeTitle = await screen.findAllByText(/recipe title/i);
      const spinner = screen.queryByText(/loading/i);
      expect(spinner).not.toBeInTheDocument();
      expect(recipeTitle).toHaveLength(3);
    });
  });
});
