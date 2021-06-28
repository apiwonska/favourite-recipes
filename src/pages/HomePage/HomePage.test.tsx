import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryCache } from 'react-query';
import user from '@testing-library/user-event';

import { testServerSetup, server, rest } from '__mocks__/testServer';
import categoriesJson from '__mocks__/categories.json';
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
    const pageHeader = screen.getByRole('heading', { level: 1 });
    const searchTextInput = screen.getByPlaceholderText(/search recipes/i);
    const searchCategoryInput = screen.getByRole('combobox');

    expect(addRecipeLink).toBeInTheDocument();
    expect(addRecipeLink).toHaveAttribute('href', '/add');
    expect(searchForm).toBeInTheDocument();
    expect(pageHeader).toHaveTextContent('Your Recipes');
    expect(searchTextInput).toBeInTheDocument();
    expect(searchCategoryInput).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByRole('option')).toHaveLength(
        categoriesJson.records.length + 1
      );
    });
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
      await waitForElementToBeRemoved(screen.getByText(/loading/i));
      const errorMessage = screen.getByText(/error/i);

      expect(errorMessage).toBeInTheDocument();
    });
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
      user.type(searchForm, 'search text');

      await waitFor(() => {
        expect(screen.getAllByTestId('recipe-card')).toHaveLength(1);
        expect(screen.getByText(/search text test/i)).toBeInTheDocument();
      });
    });

    it('filter records by category', async () => {
      render(<WrappedHomePage />);
      const searchCategory = await screen.findByRole('combobox');

      expect(
        await screen.findByRole('option', { name: 'dinner' })
      ).toBeInTheDocument();

      user.selectOptions(
        searchCategory,
        screen.getByRole('option', { name: 'dinner' })
      );

      await waitFor(() => {
        expect(screen.getAllByTestId('recipe-card')).toHaveLength(1);
        expect(screen.getByText(/search category test/i)).toBeInTheDocument();
      });
    });

    it('filter by text and category', async () => {
      render(<WrappedHomePage />);
      const searchForm = screen.getByPlaceholderText(/search recipe/i);
      const searchCategory = await screen.findByRole('combobox');

      expect(
        await screen.findByRole('option', { name: 'dinner' })
      ).toBeInTheDocument();

      user.type(searchForm, 'search text');
      user.selectOptions(
        searchCategory,
        screen.getByRole('option', { name: 'dinner' })
      );

      await waitFor(() => {
        expect(screen.getAllByTestId('recipe-card')).toHaveLength(1);
        expect(
          screen.getByText(/search text and category test/i)
        ).toBeInTheDocument();
      });
    });

    it('display message if no recipes are found', async () => {
      server.use(
        rest.get(getUrl('/recipes'), (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              records: [],
            })
          )
        )
      );
      render(<WrappedHomePage />);

      expect(await screen.findByText(/no recipes found/i)).toBeInTheDocument();
    });
  });
});
