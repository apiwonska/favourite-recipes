import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { getUrl } from 'api';
import dataPage1Json from '__mocks__/validRecipesPage1.json';
import dataPage2Json from '__mocks__/validRecipesPage2Last.json';

const server = setupServer(
  rest.get(getUrl('/recipes'), (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset');

    if (offset === 'itrDeOAYTnRLnKScW/rec09mfnUW1ANcrLB') {
      return res(ctx.status(200), ctx.json(dataPage2Json));
    }
    return res(ctx.status(200), ctx.json(dataPage1Json));
  }),
  rest.get('*', (req, res, ctx) => {
    // eslint-disable-next-line no-console
    console.error(`Missing request handler for ${req.url.toString}`);
    return res(ctx.status(500), ctx.json({ error: 'Missing request handler' }));
  })
);

const testServerSetup = (): void => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
};

export { rest, server, testServerSetup };
