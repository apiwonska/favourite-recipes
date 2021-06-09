import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryCache } from 'react-query';
import user from '@testing-library/user-event';

import { testServerSetup, server, rest } from '__mocks__/testServer';
import { getUrl } from 'apis/recipes';
import { TestWrapper } from 'shared/testUtils';
import HomePage from './HomePage';

const queryCache = new QueryCache();

const WrappedHomePage: React.FC = () => (
  <TestWrapper>
    <HomePage />
  </TestWrapper>
);

// Tests setup
testServerSetup();
afterEach(() => {
  queryCache.clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('HomePage', () => {
  it('render permanent elements of the page', async () => {
    render(<WrappedHomePage />);
    const addRecipeLink = screen.getByText(/add new recipe/i);
    const searchForm = screen.getByPlaceholderText(/search recipe/i);
    const pageHeader = screen.getByRole('heading', { level: 2 });

    expect(addRecipeLink).toBeInTheDocument();
    expect(addRecipeLink).toHaveAttribute('href', '/add');
    expect(searchForm).toBeInTheDocument();
    expect(pageHeader).toHaveTextContent('Your Recipes');
  });

  describe('while loading recipes', () => {
    it('render spinner', () => {
      render(<WrappedHomePage />);
      const spinner = screen.getByText(/loading/i);
      const recipeTitle = screen.queryAllByText(/recipe title/i);

      expect(spinner).toBeInTheDocument();
      expect(recipeTitle).toHaveLength(0);
    });
  });

  describe('while error during fetching recipes', () => {
    it('display error message', async () => {
      // Switch off logging errors
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

      server.use(
        rest.get(getUrl('/recipes'), (req, res, ctx) =>
          res(ctx.status(500), ctx.json({ errorMessage: 'Test Error' }))
        )
      );

      render(<WrappedHomePage />);
      await waitForElementToBeRemoved(screen.getByText(/loading/i), {
        timeout: 10000,
      });
      const errorMessage = screen.getByText(/error/i);

      expect(errorMessage).toBeInTheDocument();
    }, 10000);
  });

  describe('while fetch recipes successfuly', () => {
    it('renders first page of recipes correctly', async () => {
      render(<WrappedHomePage />);
      const recipes = await screen.findAllByTestId('recipe-card');
      const spinner = screen.queryByText(/loading/i);

      expect(spinner).not.toBeInTheDocument();
      expect(recipes).toHaveLength(6);
    });

    it('renders all recipes (two pages) correctly', async () => {
      const { rerender } = render(<WrappedHomePage />);

      const loadMoreButton = await screen.findByText(/load more/i);

      user.click(loadMoreButton);

      rerender(<WrappedHomePage />);

      // If it returns different number of cards check offset values for handler in testServer
      await waitFor(() =>
        expect(screen.getAllByTestId('recipe-card')).toHaveLength(7)
      );
    });

    it('filter records for searched text', async () => {
      render(<WrappedHomePage />);
      const searchForm = screen.getByPlaceholderText(/search recipe/i);
      user.type(searchForm, 'search test');
      await waitFor(() => {
        expect(screen.getAllByTestId('recipe-card')).toHaveLength(1);
        expect(
          screen.getByText('Search test. Searched recipe title')
        ).toBeInTheDocument();
      });
    });
  });
});
