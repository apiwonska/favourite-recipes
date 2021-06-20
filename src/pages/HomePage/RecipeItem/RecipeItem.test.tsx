/* disable-eslint react/jsx-props-no-spreading */
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { TestWrapper } from 'shared/testUtils';

import recipeJson from '__mocks__/recipe.json';
import { testServerSetup } from '__mocks__/testServer';
import axiosInstance from 'apis/favoriteRecipesAxiosInstance';
import RecipeItem, { IRecipeItemProps } from './RecipeItem';

// Tests setup
testServerSetup();

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

window.confirm = jest.fn();

const WrappedRecipeItem: React.FC<IRecipeItemProps> = ({ ...props }) => (
  <TestWrapper>
    <RecipeItem {...props} />
  </TestWrapper>
);

test('renders all elements of recipe card', async () => {
  render(
    <WrappedRecipeItem recipe={recipeJson.fields} recipeId={recipeJson.id} />
  );

  const title = screen.getByText(recipeJson.fields.name);
  const description = screen.getByText(recipeJson.fields.note);
  const link = screen.getByText(/go to recipe/i);
  const image = screen.getByRole('img');
  const categories = await screen.findAllByTestId('category-tag');
  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  const editBtn = screen.getByRole('button', { name: /edit/i });

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(link).toBeInTheDocument();
  expect(image).toHaveAttribute('src', recipeJson.fields.image);
  expect(categories).toHaveLength(1);
  expect(deleteBtn).toBeInTheDocument();
  expect(editBtn).toBeInTheDocument();
});

test('delete card after clicking delete button and user confirmation', async () => {
  jest
    .spyOn(axiosInstance, 'delete')
    .mockImplementation(
      jest.fn(() =>
        Promise.resolve({ data: { deleted: 'true', id: `${recipeJson.id}` } })
      )
    );
  jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
  render(
    <WrappedRecipeItem recipe={recipeJson.fields} recipeId={recipeJson.id} />
  );
  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  user.click(deleteBtn);

  expect(window.confirm).toBeCalledTimes(1);
  expect(window.confirm).toHaveReturnedWith(true);
  await waitFor(() => {
    expect(axiosInstance.delete).toBeCalledWith(`/recipes/${recipeJson.id}`);
  });
});

test('redirect to update recipe page after clicking edit button', () => {
  render(
    <WrappedRecipeItem recipe={recipeJson.fields} recipeId={recipeJson.id} />
  );
  const editBtn = screen.getByRole('button', { name: /edit/i });

  user.click(editBtn);
  expect(mockHistoryPush).toBeCalledWith(`/update/${recipeJson.id}`);
});
