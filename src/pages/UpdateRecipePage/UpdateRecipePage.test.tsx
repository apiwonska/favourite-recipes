import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { QueryCache } from 'react-query';
import { Route } from 'react-router-dom';

import { testServerSetup, server, rest } from '__mocks__/testServer';
import { TestWrapper, getString } from 'shared/testUtils';
import { getUrl } from 'apis/recipes';
import validRecipe from '__mocks__/validRecipe.json';
import validRecipeUpdated from '__mocks__/validRecipeUpdated.json';
import UpdateRecipePage from './UpdateRecipePage';

const WrappedUpdateRecipePage: React.FC = () => (
  <TestWrapper route="/update/testid">
    <Route path="/update/:recipeId" component={UpdateRecipePage} exact />
  </TestWrapper>
);

const queryCache = new QueryCache();

// Tests setup
testServerSetup();
afterEach(() => {
  queryCache.clear();
});

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
      const saveButton = screen.getByRole('button', { name: /save/i });
      const cancelButton = screen.getByRole('button', { name: /cancel/i });

      expect(form).toBeInTheDocument();
      expect(nameInput).toHaveValue(validRecipe.fields.name);
      expect(linkInput).toHaveValue(validRecipe.fields.link);
      expect(imageInput).toHaveValue(validRecipe.fields.image);
      expect(noteInput).toHaveValue(validRecipe.fields.note);
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

  describe('with valid input (only required fields)', () => {
    const setup = async () => {
      const utils = render(<WrappedUpdateRecipePage />);
      await waitForElementToBeRemoved(screen.getByText(/loading/i));
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const noteInput = screen.getByRole('textbox', { name: /note/i });
      const saveButton = screen.getByRole('button', { name: /save/i });
      const homePageLink = screen.getByRole('link', { name: /home page/i });
      user.type(nameInput, 'a');
      user.type(linkInput, 'a');
      user.type(imageInput, 'a');
      user.type(noteInput, 'a');
      user.click(saveButton);
      return {
        ...utils,
        nameInput,
        linkInput,
        imageInput,
        noteInput,
        saveButton,
        homePageLink,
      };
    };

    it('show success message if response status is ok', async () => {
      await setup();
      const successMessage = await screen.findByText(/recipe was saved/i);

      expect(successMessage).toBeInTheDocument();
    });

    it('display changed input values after submit', async () => {
      const { nameInput, linkInput, imageInput, noteInput } = await setup();

      await waitFor(() => {
        expect(nameInput).toHaveValue(validRecipeUpdated.fields.name);
        expect(linkInput).toHaveValue(validRecipeUpdated.fields.link);
        expect(imageInput).toHaveValue(validRecipeUpdated.fields.image);
        expect(noteInput).toHaveValue(validRecipeUpdated.fields.note);
      });
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

      const { nameInput } = await setup();

      await waitFor(
        () => {
          const errorMessage = screen.getByText(/error occurred/i);
          expect(errorMessage).toBeInTheDocument();
        },
        {
          timeout: 2000,
        }
      );

      expect(nameInput).toHaveValue(`${validRecipe.fields.name}a`);
    }, 10000);
  });

  describe('with invalid input', () => {
    const setup = async () => {
      const utils = render(<WrappedUpdateRecipePage />);
      await waitForElementToBeRemoved(screen.getByText(/loading/i));
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const noteInput = screen.getByRole('textbox', { name: /note/i });
      return {
        ...utils,
        nameInput,
        linkInput,
        imageInput,
        noteInput,
      };
    };

    it('renders error for empty required fields on blur', async () => {
      const { nameInput, linkInput } = await setup();
      user.clear(nameInput);
      user.clear(linkInput);
      const errorName = await screen.findByText(/name is a required field/i);
      const errorLink = await screen.findByText(/link is a required field/i);

      expect(errorName).toBeInTheDocument();
      expect(errorLink).toBeInTheDocument();
    });

    it('renders error if user put spaces for required input', async () => {
      const { nameInput, linkInput } = await setup();
      user.clear(nameInput);
      user.clear(linkInput);
      user.type(nameInput, ' ');
      user.type(linkInput, ' ');
      const errorName = await screen.findByText(/name is a required field/i);
      const errorLink = await screen.findByText(/link is a required field/i);

      expect(errorName).toBeInTheDocument();
      expect(errorLink).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      expect(linkInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for name shorter than 2', async () => {
      const { nameInput } = await setup();
      user.clear(nameInput);
      user.type(nameInput, 'a');
      const errorName = await screen.findByText(
        'name must be at least 2 characters'
      );

      expect(errorName).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for name longer than 50 characters', async () => {
      const { nameInput } = await setup();
      user.clear(nameInput);
      user.type(nameInput, getString(51));
      const errorName = await screen.findByText(
        'name must be at most 50 characters'
      );

      expect(errorName).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for note longer than 100 characters', async () => {
      const { noteInput } = await setup();
      const errorMessage = 'note must be at most 100 characters';
      user.clear(noteInput);
      user.type(noteInput, getString(101));
      const errorNote = await screen.findByText(errorMessage);

      expect(errorNote).toBeInTheDocument();
      expect(noteInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for link if it is not valid url', async () => {
      const { linkInput } = await setup();
      const errorMessage = 'link must be a valid URL';
      user.clear(linkInput);
      user.type(linkInput, 'buritto.com');

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(linkInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for image if it is not valid url', async () => {
      const { imageInput } = await setup();
      const errorMessage = 'image must be a valid URL';
      user.clear(imageInput);
      user.type(imageInput, 'buritto.com');

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(imageInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
