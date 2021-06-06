import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from 'App';

jest.mock(
  'layout/PageLayout',
  () => ({ children }: { children: React.ReactNode }) => (
    <div>Page Layout {children}</div>
  )
);
jest.mock('pages/HomePage', () => () => <div>Home Page</div>);
jest.mock('pages/AddRecipePage', () => () => <div>Add Recipe Page</div>);
jest.mock('pages/UpdateRecipePage', () => () => <div>Update Recipe Page</div>);

interface IWrappedAppProps {
  route: string;
}

const WrappedApp: React.FC<IWrappedAppProps> = ({ route }) => (
  <MemoryRouter initialEntries={[route]}>
    <App />
  </MemoryRouter>
);

describe('App', () => {
  it('Render Home Page for default route', () => {
    render(<WrappedApp route="/" />);

    expect(screen.getByText(/page layout/i)).toBeInTheDocument();
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
    expect(screen.queryByText(/add recipe page/i)).not.toBeInTheDocument();
  });

  it('Render Add Recipe Page for "/add" route', () => {
    render(<WrappedApp route="/add" />);

    expect(screen.getByText(/add recipe page/i)).toBeInTheDocument();
    expect(screen.queryByText(/home page/i)).not.toBeInTheDocument();
  });

  it('Render Update Recipe Page for "/update/:id" route', () => {
    render(<WrappedApp route="/update/id" />);

    expect(screen.getByText(/update recipe page/i)).toBeInTheDocument();
    expect(screen.queryByText(/home page/i)).not.toBeInTheDocument();
  });
});
