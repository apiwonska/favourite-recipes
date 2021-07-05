import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { getUrl } from 'shared/testUtils';
import recipesPage1Json from '__mocks__/recipesPage1.json';
import recipesPage2Json from '__mocks__/recipesPage2Last.json';
import recipesSearchTextJson from '__mocks__/recipesSearchText.json';
import recipesSearchCategoryJson from '__mocks__/recipesSearchCategory.json';
import recipesSearchTextAndCategoryJson from '__mocks__/recipesSearchTextAndCategory.json';
import recipeJson from '__mocks__/recipe.json';
import categoriesJson from '__mocks__/categories.json';

const server = setupServer(
  rest.get(getUrl('/recipes'), (req, res, ctx) => {
    const recipeId = req.url.searchParams.get('recipeId');
    const pageParam = req.url.searchParams.get('pageParam');
    const searchText = req.url.searchParams.get('searchText');
    const searchCategory = req.url.searchParams.get('searchCategory');

    if (recipeId === 'testid') {
      return res(ctx.status(200), ctx.json(recipeJson));
    }
    if (searchText === 'search text' && searchCategory === 'dinner') {
      return res(ctx.status(200), ctx.json(recipesSearchTextAndCategoryJson));
    }
    if (searchText === 'search text') {
      return res(ctx.status(200), ctx.json(recipesSearchTextJson));
    }
    if (searchCategory === 'dinner') {
      return res(ctx.status(200), ctx.json(recipesSearchCategoryJson));
    }
    // Works if there are only 2 pages. If you have more you need to specify offsets values
    if (pageParam !== '') {
      return res(ctx.status(200), ctx.json(recipesPage2Json));
    }
    return res(ctx.status(200), ctx.json(recipesPage1Json));
  }),

  rest.post(getUrl('/recipes'), (req, res, ctx) => res(ctx.status(200))),
  rest.put(getUrl('/recipes'), (req, res, ctx) => res(ctx.status(200))),
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
