import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { testServerSetup, server, rest } from '__mocks__/testServer';
import { TestWrapper, getString } from 'shared/testUtils';
import { getUrl } from 'apis/recipes';
import recipeJson from '__mocks__/recipe.json';
import recipeUpdatedJson from '__mocks__/recipeUpdated.json';
import UpdateRecipePage from './UpdateRecipePage';

const WrappedUpdateRecipePage: React.FC = () => (
  <TestWrapper route="/update/testid">
    <Route path="/update/:recipeId" component={UpdateRecipePage} exact />
  </TestWrapper>
);

// Tests setup
testServerSetup();

describe('UpdateRecipePage', () => {
  describe('page layout and initial form state', () => {
    it('page title is correct', () => {
      render(<WrappedUpdateRecipePage />);
      expect(document.title).toContain('Favourite Recipes | Update Recipe');
    });

    it('renders form correctly and with initial input values', async () => {
      render(<WrappedUpdateRecipePage />);

      expect(screen.queryByText(/loading/i)).toBeInTheDocument();
      await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
      const form = screen.getByRole('form');
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const noteInput = screen.getByRole('textbox', { name: /note/i });
      const categoriesInput = screen.getByRole('listbox', {
        name: /categories/i,
      });
      const saveButton = screen.getByRole('button', { name: /save/i });
      const cancelButton = screen.getByRole('button', { name: /cancel/i });

      expect(form).toBeInTheDocument();
      expect(nameInput).toHaveValue(recipeJson.fields.name);
      expect(linkInput).toHaveValue(recipeJson.fields.link);
      expect(imageInput).toHaveValue(recipeJson.fields.image);
      expect(noteInput).toHaveValue(recipeJson.fields.note);
      expect(categoriesInput).toHaveValue(recipeJson.fields.categories);
      expect(saveButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    it('renders other elements of the page', async () => {
      render(<WrappedUpdateRecipePage />);
      const homePageLink = await screen.findByRole('link', {
        name: /home page/i,
      });
      const header = await screen.findByRole('heading', {
        name: /update recipe/i,
      });

      expect(homePageLink).toHaveAttribute('href', '/');
      expect(header).toBeInTheDocument();
    });

    it('focus is on name input', async () => {
      render(<WrappedUpdateRecipePage />);
      const nameInput = await screen.findByRole('textbox', { name: /name/i });

      expect(nameInput).toHaveFocus();
    });

    it('save button is enabled', async () => {
      render(<WrappedUpdateRecipePage />);
      const saveButton = await screen.findByRole('button', { name: /save/i });

      expect(saveButton).toBeEnabled();
    });
  });

  describe('with valid input', () => {
    const setup = async () => {
      server.use(
        rest.head(recipeUpdatedJson.fields.image, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.set({
              'Content-Type': 'image/jpeg',
              'Content-Length': '20000',
            })
          )
        )
      );
      const utils = render(<WrappedUpdateRecipePage />);
      await waitForElementToBeRemoved(screen.getByText(/loading/i));
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const noteInput = screen.getByRole('textbox', { name: /note/i });
      const categoriesInput = screen.getByRole('listbox', {
        name: /categories/i,
      });
      const saveButton = screen.getByRole('button', { name: /save/i });
      const homePageLink = screen.getByRole('link', { name: /home page/i });
      user.clear(nameInput);
      user.type(nameInput, recipeUpdatedJson.fields.name);
      user.clear(linkInput);
      user.type(linkInput, recipeUpdatedJson.fields.link);
      user.clear(imageInput);
      user.type(imageInput, recipeUpdatedJson.fields.image);
      user.clear(noteInput);
      user.type(noteInput, recipeUpdatedJson.fields.note);
      user.selectOptions(categoriesInput, 'breakfast');
      user.click(saveButton);

      return {
        ...utils,
        nameInput,
        linkInput,
        imageInput,
        noteInput,
        categoriesInput,
        saveButton,
        homePageLink,
      };
    };

    it('show success message and display changed input values after successful submit', async () => {
      const {
        nameInput,
        linkInput,
        imageInput,
        noteInput,
        categoriesInput,
      } = await setup();

      const successMessage = await screen.findByText(/recipe was saved/i);

      expect(successMessage).toBeInTheDocument();
      expect(nameInput).toHaveValue(recipeUpdatedJson.fields.name);
      expect(linkInput).toHaveValue(recipeUpdatedJson.fields.link);
      expect(imageInput).toHaveValue(recipeUpdatedJson.fields.image);
      expect(noteInput).toHaveValue(recipeUpdatedJson.fields.note);
      expect(categoriesInput).toHaveValue(recipeUpdatedJson.fields.categories);
    });

    it('focus on Go To HomePage link if response status is ok', async () => {
      const { homePageLink } = await setup();

      await waitFor(() => {
        expect(homePageLink).toHaveFocus();
      });
    });

    it('show error message and keep form data if response status is error', async () => {
      // Switch off logging errors
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      server.use(
        rest.put(getUrl('/recipes/testid'), (req, res, ctx) =>
          res(ctx.status(500))
        )
      );
      const {
        nameInput,
        linkInput,
        imageInput,
        noteInput,
        categoriesInput,
      } = await setup();
      const errorMessage = await screen.findByText(
        /error occurred/i,
        {},
        { timeout: 1500 }
      );

      expect(errorMessage).toBeInTheDocument();
      expect(nameInput).toHaveValue(recipeUpdatedJson.fields.name);
      expect(linkInput).toHaveValue(recipeUpdatedJson.fields.link);
      expect(imageInput).toHaveValue(recipeUpdatedJson.fields.image);
      expect(noteInput).toHaveValue(recipeUpdatedJson.fields.note);
      expect(categoriesInput).toHaveValue(recipeUpdatedJson.fields.categories);
    });
  });

  describe('with invalid input', () => {
    const setup = async () => {
      server.use(
        rest.head(recipeJson.fields.image, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.set({
              'Content-Type': 'image/jpeg',
              'Content-Length': '20000',
            })
          )
        )
      );
      const utils = render(<WrappedUpdateRecipePage />);
      await waitForElementToBeRemoved(screen.getByText(/loading/i));
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const noteInput = screen.getByRole('textbox', { name: /note/i });
      const saveButton = screen.getByRole('button', { name: /save recipe/i });
      return {
        ...utils,
        nameInput,
        linkInput,
        imageInput,
        noteInput,
        saveButton,
      };
    };

    it('renders error for empty required fields on submit', async () => {
      const { nameInput, linkInput, saveButton } = await setup();
      user.clear(nameInput);
      user.clear(linkInput);
      user.click(saveButton);
      const errorName = await screen.findByText(/name is a required field/i);
      const errorLink = await screen.findByText(/link is a required field/i);
      expect(errorName).toBeInTheDocument();
      expect(errorLink).toBeInTheDocument();
    });

    it('renders error if required input is spaces', async () => {
      const { nameInput, linkInput, saveButton } = await setup();
      user.clear(nameInput);
      user.clear(linkInput);
      user.type(nameInput, ' ');
      user.type(linkInput, ' ');
      user.click(saveButton);
      const errorName = await screen.findByText(/name is a required field/i);
      const errorLink = await screen.findByText(/link is a required field/i);
      expect(errorName).toBeInTheDocument();
      expect(errorLink).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      expect(linkInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for name shorter than 2', async () => {
      const { nameInput, saveButton } = await setup();
      user.clear(nameInput);
      user.type(nameInput, 'a');
      user.click(saveButton);
      const errorName = await screen.findByText(
        'name must be at least 2 characters'
      );
      expect(errorName).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for name longer than 50 characters', async () => {
      const { nameInput, saveButton } = await setup();
      user.clear(nameInput);
      user.type(nameInput, getString(51));
      user.click(saveButton);
      const errorName = await screen.findByText(
        'name must be at most 50 characters'
      );
      expect(errorName).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for note longer than 100 characters', async () => {
      const { noteInput, saveButton } = await setup();
      const errorMessage = 'note must be at most 100 characters';
      user.clear(noteInput);
      user.type(noteInput, getString(101));
      user.click(saveButton);
      const errorNote = await screen.findByText(errorMessage);
      expect(errorNote).toBeInTheDocument();
      expect(noteInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for link if it is not valid url', async () => {
      server.use(
        rest.head('http://localhost/buritto.com', (req, res, ctx) =>
          res(ctx.status(404))
        )
      );
      const { linkInput, saveButton } = await setup();
      const errorMessage = 'link must be a valid URL';
      user.clear(linkInput);
      user.type(linkInput, 'buritto.com');
      user.click(saveButton);
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(linkInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for image field if it the resource does not return jpeg file', async () => {
      server.use(
        rest.head('http://buritto.com', (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.set({
              'Content-Type': 'text/html',
            })
          )
        )
      );
      const { imageInput, saveButton } = await setup();
      const errorMessage = 'enter a valid correct url for jpeg image';
      user.clear(imageInput);
      user.type(imageInput, 'http://buritto.com');
      user.click(saveButton);
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(imageInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for image field if the content-length is bigger than 300kB', async () => {
      server.use(
        rest.head('http://buritto.com/2.jpg', (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.set({
              'Content-Type': 'image/jpeg',
              'Content-Length': '301000',
            })
          )
        )
      );

      const { imageInput, saveButton } = await setup();
      const errorMessage =
        'image size is too big, it should be smaller than 300kB';
      user.clear(imageInput);
      user.type(imageInput, 'http://buritto.com/2.jpg');
      user.click(saveButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(imageInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
