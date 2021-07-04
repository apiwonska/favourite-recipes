import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import { testServerSetup, server, rest } from '__mocks__/testServer';
import { TestWrapper, getString, getUrl } from 'shared/testUtils';
import AddRecipePage from './AddRecipePage';

const WrappedAddRecipePage: React.FC = () => (
  <TestWrapper>
    <AddRecipePage />
  </TestWrapper>
);

// Tests setup
testServerSetup();

afterEach(() => {
  jest.restoreAllMocks();
});

describe('AddRecipePage', () => {
  describe('page layout and initial form state', () => {
    it('alter document title', () => {
      render(<WrappedAddRecipePage />);
      expect(document.title).toContain('Favourite Recipes | Add New Recipe');
    });

    it('renders all form elements correctly', async () => {
      render(<WrappedAddRecipePage />);
      const form = screen.getByRole('form');
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const noteInput = screen.getByRole('textbox', { name: /note/i });
      const categoriesInput = await screen.findByRole('listbox', {
        name: /categories/i,
      });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const cancelButton = screen.getByRole('button', { name: /cancel/i });

      expect(form).toBeInTheDocument();
      expect(nameInput).toHaveValue('');
      expect(linkInput).toHaveValue('');
      expect(imageInput).toHaveValue('');
      expect(noteInput).toHaveValue('');
      expect(categoriesInput).toHaveValue([]);
      expect(submitButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    it('renders other elements of the page', () => {
      render(<WrappedAddRecipePage />);
      const homePageLink = screen.getByRole('link', { name: /home page/i });
      const header = screen.getByRole('heading', { name: /add new recipe/i });

      expect(homePageLink).toHaveAttribute('href', '/');
      expect(header).toBeInTheDocument();
    });

    it('focus is on name input', () => {
      render(<WrappedAddRecipePage />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });

      expect(nameInput).toHaveFocus();
    });

    it('submit button is enabled', () => {
      render(<WrappedAddRecipePage />);
      const submitButton = screen.getByRole('button', { name: /submit/i });

      expect(submitButton).toBeEnabled();
    });
  });

  describe('with valid input', () => {
    const setup = async () => {
      server.use(
        rest.head('http://buritto.com/1.jpg', (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.set({ 'Content-Type': 'image/jpeg', 'Content-Length': '50000' })
          )
        )
      );
      const utils = render(<WrappedAddRecipePage />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const noteInput = screen.getByRole('textbox', { name: /note/i });
      const categoriesInput = await screen.findByRole('listbox', {
        name: /categories/i,
      });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const homePageLink = screen.getByRole('link', { name: /home page/i });
      user.type(nameInput, 'buritto');
      user.type(linkInput, 'http://buritto.com');
      user.type(imageInput, 'http://buritto.com/1.jpg');
      user.type(noteInput, "it's awesome");
      user.selectOptions(categoriesInput, ['breakfast', 'lunch']);
      user.click(submitButton);
      return { ...utils, nameInput, linkInput, submitButton, homePageLink };
    };

    it('show success message if response status is ok', async () => {
      await setup();
      const successMessage = await screen.findByText(/recipe was saved/i);

      expect(successMessage).toBeInTheDocument();
    });

    it('reset form if response status is ok', async () => {
      const { nameInput, linkInput } = await setup();

      await waitFor(() => {
        expect(nameInput).toHaveValue('');
        expect(linkInput).toHaveValue('');
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
        rest.post(getUrl('/recipes'), (req, res, ctx) => res(ctx.status(500)))
      );
      const { nameInput, linkInput } = await setup();

      expect(
        await screen.findByText(
          /error occurred/i,
          {},
          {
            timeout: 1500,
          }
        )
      ).toBeInTheDocument();

      expect(nameInput).toHaveValue('buritto');
      expect(linkInput).toHaveValue('http://buritto.com');
    });
  });

  describe('with invalid input', () => {
    it('renders error for empty required fields after on submit', async () => {
      render(<WrappedAddRecipePage />);
      const submitButton = screen.getByRole('button', { name: /submit/i });
      user.click(submitButton);
      const errorName = await screen.findByText(/name is a required field/i);
      const errorLink = await screen.findByText(/link is a required field/i);

      expect(errorName).toBeInTheDocument();
      expect(errorLink).toBeInTheDocument();
    });

    it('renders error if required input consists of white space', async () => {
      render(<WrappedAddRecipePage />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      user.type(nameInput, ' ');
      user.type(linkInput, ' ');
      user.click(submitButton);
      const errorName = await screen.findByText(/name is a required field/i);
      const errorLink = await screen.findByText(/link is a required field/i);

      expect(errorName).toBeInTheDocument();
      expect(errorLink).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
      expect(linkInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for name shorter than 2', async () => {
      render(<WrappedAddRecipePage />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      user.type(nameInput, 'a');
      user.click(submitButton);
      const errorName = await screen.findByText(
        'name must be at least 2 characters'
      );

      expect(errorName).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for name longer than 50 characters', async () => {
      render(<WrappedAddRecipePage />);
      const nameInput = screen.getByRole('textbox', { name: /name/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      expect(
        screen.queryByText('name must be at most 50 characters')
      ).not.toBeInTheDocument();

      user.type(nameInput, getString(51));
      user.click(submitButton);
      const errorName = await screen.findByText(
        'name must be at most 50 characters'
      );

      expect(errorName).toBeInTheDocument();
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for note longer than 100 characters', async () => {
      render(<WrappedAddRecipePage />);
      const noteInput = screen.getByRole('textbox', { name: /note/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const errorMessage = 'note must be at most 100 characters';

      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

      user.type(noteInput, getString(101));
      user.click(submitButton);
      const errorNote = await screen.findByText(errorMessage);

      expect(errorNote).toBeInTheDocument();
      expect(noteInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for link if it is not valid url', async () => {
      render(<WrappedAddRecipePage />);
      const linkInput = screen.getByRole('textbox', { name: /link/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const errorMessage = 'link must be a valid URL';

      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

      user.type(linkInput, 'dsfgfs@ds');
      user.click(submitButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(linkInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for image if it is not valid url', async () => {
      server.use(
        rest.head('http://localhost/buritto img', (req, res, ctx) =>
          res(ctx.status(404))
        )
      );
      render(<WrappedAddRecipePage />);
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const errorMessage = 'image must be a valid URL';

      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

      user.type(imageInput, 'buritto img');
      user.click(submitButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(imageInput).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error for image field if it the resource does not return jpeg file', async () => {
      server.use(
        rest.head('http://buritto.com', (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.set({
              'Content-Type': 'html/text',
            })
          )
        )
      );
      render(<WrappedAddRecipePage />);
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const errorMessage = 'enter a valid correct URL for the jpeg image';
      user.type(imageInput, 'http://buritto.com');
      user.click(submitButton);

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
      render(<WrappedAddRecipePage />);
      const imageInput = screen.getByRole('textbox', { name: /image/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });
      const errorMessage =
        'image size is too big, it should be smaller than 300kB';
      user.type(imageInput, 'http://buritto.com/2.jpg');
      user.click(submitButton);

      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      expect(imageInput).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
