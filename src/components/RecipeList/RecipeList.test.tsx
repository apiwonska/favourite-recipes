import { render, screen } from '@testing-library/react';

import { RecipeInterface } from 'app_interfaces';
import RecipeList from './RecipeList';
import useFetchRecipesMock from './useFetchRecipes';

jest.mock('./useFetchRecipes.ts', () => jest.fn());

const createRecipe = (n: number): RecipeInterface => ({
  id: `${n}`,
  fields: {
    name: `Recipe title ${n}`,
    link: `url ${n}`,
    note: `Best apple pie recipe ${n}`,
  },
});
const data = { records: [1, 2, 3].map((n) => createRecipe(n)) };

describe('RecipeList', () => {
  describe('while loading', () => {
    it('render spinner', () => {
      (useFetchRecipesMock as jest.Mock).mockImplementation(() => ({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
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
        error: { errorMessage: 'Error' },
      }));
      render(<RecipeList />);
      const errorMessage = screen.queryByText(/error/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('fetch data successfuly', () => {
    it('renders a list of recipe cards correctly', () => {
      (useFetchRecipesMock as jest.Mock).mockImplementation(() => ({
        data,
        isLoading: false,
        isError: false,
        error: null,
      }));
      render(<RecipeList />);
      const recipes = screen.queryAllByText(/recipe title/i);
      expect(recipes).toHaveLength(3);
    });
  });
});
