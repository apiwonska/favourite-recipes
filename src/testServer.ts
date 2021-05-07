import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { url as apiUrl } from 'api';
import data from '__mocks__/validRecipesData';

const server = setupServer(
  rest.get(`${apiUrl}/recipes`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(data))
  ),
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
