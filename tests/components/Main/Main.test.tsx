import { render, screen } from '@testing-library/react';
import { Main } from '~/components';

describe('Main', () => {
  it('should render children', () => {
    render(<Main>Children</Main>);

    const children = screen.getByText('Children');

    expect(children).toBeInTheDocument();
  });
});
