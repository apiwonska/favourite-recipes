import { render, screen } from '@testing-library/react';

import RecipeItem from './RecipeItem';

const recipe = {
  name: 'Grandma Apple Pie',
  link: 'url',
  note: 'Best apple pie recipe',
};

test('renders recipe card', () => {
  render(<RecipeItem recipe={recipe} />);

  const title = screen.getByText(recipe.name);
  const description = screen.getByText(recipe.note);
  const link = screen.getByText(/go to recipe/i);

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(link).toBeInTheDocument();
});
