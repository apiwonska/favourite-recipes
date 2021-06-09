import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { getUrl } from 'apis/recipes';
import recipesPage1Json from '__mocks__/recipesPage1.json';
import recipesPage2Json from '__mocks__/recipesPage2Last.json';
import recipesSearchTestJson from '__mocks__/recipesSearchTest.json';
import recipeJson from '__mocks__/recipe.json';

const server = setupServer(
  rest.get(getUrl('/recipes'), (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');
    const filterByFormula = req.url.searchParams.get('filterByFormula');

    if (filterByFormula?.includes('search test')) {
      return res(ctx.status(200), ctx.json(recipesSearchTestJson));
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
