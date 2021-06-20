import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { getUrl } from 'apis/recipes';
import recipesPage1Json from '__mocks__/recipesPage1.json';
import recipesPage2Json from '__mocks__/recipesPage2Last.json';
import recipesSearchTextJson from '__mocks__/recipesSearchText.json';
import recipesSearchCategoryJson from '__mocks__/recipesSearchCategory.json';
import recipesSearchTextAndCategoryJson from '__mocks__/recipesSearchTextAndCategory.json';
import recipeJson from '__mocks__/recipe.json';
import categoriesJson from '__mocks__/categories.json';

const server = setupServer(
  rest.get(getUrl('/recipes'), (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');
    const filterByFormula = req.url.searchParams.get('filterByFormula');

    if (
      filterByFormula ===
      `AND(NOT(name=''),NOT(link=''),OR(SEARCH("search text",LOWER(name)),SEARCH("search text",LOWER(note))))`
    ) {
      return res(ctx.status(200), ctx.json(recipesSearchTextJson));
    }

    if (
      filterByFormula ===
      `AND(NOT(name=''),NOT(link=''),SEARCH("dinner",categories))`
    ) {
      return res(ctx.status(200), ctx.json(recipesSearchCategoryJson));
    }

    if (
      filterByFormula ===
      `AND(NOT(name=''),NOT(link=''),OR(SEARCH("search text",LOWER(name)),SEARCH("search text",LOWER(note))),SEARCH("dinner",categories))`
    ) {
      return res(ctx.status(200), ctx.json(recipesSearchTextAndCategoryJson));
    }

    // Works if there are only 2 pages. If you have more you need to specify offsets values
    if (offset !== '') {
      return res(ctx.status(200), ctx.json(recipesPage2Json));
    }

    return res(ctx.status(200), ctx.json(recipesPage1Json));
  }),
  rest.post(getUrl('/recipes'), (req, res, ctx) => res(ctx.status(200))),
  rest.get(getUrl('/recipes/testid'), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(recipeJson))
  ),
  rest.put(getUrl('/recipes/testid'), (req, res, ctx) => res(ctx.status(200))),
  rest.get(getUrl('/categories'), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(categoriesJson))
  ),
  rest.get('*', (req, res, ctx) => {
    // eslint-disable-next-line no-console
    console.error(`Missing request handler for ${req.url.toString}`);
    return res(ctx.status(500), ctx.json({ error: 'Missing request handler' }));
  })
);

const testServerSetup = (): void => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
};

export { rest, server, testServerSetup };
