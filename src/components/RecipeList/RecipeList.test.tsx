import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import user from '@testing-library/user-event';

import { testServerSetup, server, rest } from '__mocks__/testServer';
import { getUrl } from 'api';
import RecipeList from './RecipeList';

const queryCache = new QueryCache();

const RecipeListWithQueryClient = () => {
  const client = new QueryClient();

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

  describe('while error', () => {
    it('display error message', async () => {
      // Switch off logging errors
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      server.use(
        rest.get(getUrl('/recipes'), (req, res, ctx) =>
          res(ctx.status(500), ctx.json({ errorMessage: 'Test Error' }))
        )
      );

      render(<RecipeListWithQueryClient />);
      await waitForElementToBeRemoved(screen.getByText(/loading/i), {
        timeout: 10000,
      });
      const errorMessage = screen.getByText(/error/i);

      expect(errorMessage).toBeInTheDocument();
    }, 10000);
  });

  describe('fetch data successfuly', () => {
    it('renders first page of recipes correctly', async () => {
      render(<RecipeListWithQueryClient />);
      const recipes = await screen.findAllByTestId('recipe-card');
      const spinner = screen.queryByText(/loading/i);

      expect(spinner).not.toBeInTheDocument();
      expect(recipes).toHaveLength(5);
    });

    it('renders all recipes (two pages) correctly', async () => {
      const { rerender } = render(<RecipeListWithQueryClient />);

      const loadMoreButton = await screen.findByText(/load more/i);

      user.click(loadMoreButton);

      rerender(<RecipeListWithQueryClient />);

      await waitFor(() =>
        expect(screen.getAllByTestId('recipe-card')).toHaveLength(6)
      );
    });
  });
});
