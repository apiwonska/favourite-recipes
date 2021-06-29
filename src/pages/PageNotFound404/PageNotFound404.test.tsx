import { render, screen } from '@testing-library/react';

import PageNotFound404 from './PageNotFound404';

describe('PageNotFound404', () => {
  it('alter document title', () => {
    render(<PageNotFound404 />);
    expect(document.title).toContain('Favourite Recipes | Page Not Found');
  });

  it('renders 404 page correctly', () => {
    render(<PageNotFound404 />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Page Not Found'
    );

    expect(screen.getByTestId('error-illustration')).toBeVisible();
    expect(screen.getByTestId('error-illustration')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
});
