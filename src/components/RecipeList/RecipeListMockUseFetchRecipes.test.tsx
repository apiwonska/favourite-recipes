import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import dataPage1 from '__mocks__/dataPage1';
import dataPage2 from '__mocks__/dataPage2Last';
import RecipeList from './RecipeList';
import useFetchRecipesMock from './useFetchRecipes';

jest.mock('./useFetchRecipes', () => jest.fn());

describe('RecipeList', () => {
  describe('while loading', () => {
    it('render spinner', () => {
      (useFetchRecipesMock as jest.Mock).mockImplementation(() => ({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
        fetchNextPage: jest.fn(),
        hasNextPage: undefined,
        isFetchingNextPage: false,
      }));
      render(<RecipeList />);
      const spinner = screen.queryByText(/loading/i);
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('while error', () => {
    it('display error message', () => {
      (useFetchRecipesMock as jest.Mock).mockImplementation(() => ({
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error('Error'),
        fetchNextPage: jest.fn(),
        hasNextPage: undefined,
        isFetchingNextPage: false,
      }));
      render(<RecipeList />);
      const errorMessage = screen.queryByText(/error/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('fetch data successfuly', () => {
    it('renders first page of recipes and load more button is enabled', () => {
      (useFetchRecipesMock as jest.Mock).mockImplementation(() => ({
        data: dataPage1,
        isLoading: false,
        isError: false,
        error: null,
        fetchNextPage: jest.fn(),
        hasNextPage: true,
        isFetchingNextPage: false,
      }));
      render(<RecipeList />);
      const recipes = screen.queryAllByTestId('recipe-card');

      expect(recipes).toHaveLength(5);
    });

    it('call fetchNextPage after clicking "load more" button', () => {
      const fetchNextPage = jest.fn();
      (useFetchRecipesMock as jest.Mock).mockImplementation(() => ({
        data: dataPage1,
        isLoading: false,
        isError: false,
        error: null,
        fetchNextPage,
        hasNextPage: true,
        isFetchingNextPage: false,
      }));
      render(<RecipeList />);
      const loadMoreBtn = screen.getByText(/load more/i);

      expect(loadMoreBtn).toBeEnabled();

      user.click(loadMoreBtn);

      expect(fetchNextPage).toHaveBeenCalledTimes(1);
    });

    it('renders all recipes and disables load more button', () => {
      (useFetchRecipesMock as jest.Mock).mockImplementation(() => ({
        data: dataPage2,
        isLoading: false,
        isError: false,
        error: null,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
      }));
      render(<RecipeList />);
      const recipes = screen.queryAllByTestId('recipe-card');
      const loadMoreBtn = screen.queryByText(/load more/i);

      expect(recipes).toHaveLength(6);
      expect(loadMoreBtn).toBeDisabled();
    });
  });
});
