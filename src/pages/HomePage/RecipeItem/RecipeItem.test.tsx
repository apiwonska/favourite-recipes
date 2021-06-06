/* disable-eslint react/jsx-props-no-spreading */
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { TestWrapper } from 'shared/testUtils';

import recipeData from '__mocks__/validRecipe.json';
import axiosInstance from 'apis/recipesAxiosInstance';
import RecipeItem, { IRecipeItemProps } from './RecipeItem';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('apis/recipesAxiosInstance', () => ({
  delete: jest.fn(),
}));

window.confirm = jest.fn();

const WrappedRecipeItem: React.FC<IRecipeItemProps> = ({ ...props }) => (
  <TestWrapper>
    <RecipeItem {...props} />
  </TestWrapper>
);

test('renders all elements of recipe card', () => {
  render(
    <WrappedRecipeItem recipe={recipeData.fields} recipeId={recipeData.id} />
  );

  const title = screen.getByText(recipeData.fields.name);
  const description = screen.getByText(recipeData.fields.note);
  const link = screen.getByText(/go to recipe/i);
  const image = screen.getByRole('img');
  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  const editBtn = screen.getByRole('button', { name: /edit/i });

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(link).toBeInTheDocument();
  expect(image).toHaveAttribute('src', recipeData.fields.image);
  expect(deleteBtn).toBeInTheDocument();
  expect(editBtn).toBeInTheDocument();
});

test('delete card after clicking delete button and user confirmation', async () => {
  jest
    .spyOn(axiosInstance, 'delete')
    .mockImplementation(
      jest.fn(() =>
        Promise.resolve({ data: { deleted: 'true', id: `${recipeData.id}` } })
      )
    );
  jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
  render(
    <WrappedRecipeItem recipe={recipeData.fields} recipeId={recipeData.id} />
  );
  const deleteBtn = screen.getByRole('button', { name: /delete/i });
  user.click(deleteBtn);

  expect(window.confirm).toBeCalledTimes(1);
  expect(window.confirm).toHaveReturnedWith(true);
  await waitFor(() => {
    expect(axiosInstance.delete).toBeCalledWith(`/recipes/${recipeData.id}`);
  });
});

test('go to update recipe page after clicking edit button', () => {
  render(
    <WrappedRecipeItem recipe={recipeData.fields} recipeId={recipeData.id} />
  );
  const editBtn = screen.getByRole('button', { name: /edit/i });

  user.click(editBtn);
  expect(mockHistoryPush).toBeCalledWith(`/update/${recipeData.id}`);
});
