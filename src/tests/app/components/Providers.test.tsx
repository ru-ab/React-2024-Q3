import { render, screen } from '@testing-library/react';
import { Providers } from '@/app/components/Providers';

describe('Providers', () => {
  it('should render children', () => {
    render(<Providers>Children</Providers>);

    const children = screen.getByText('Children');

    expect(children).toBeInTheDocument();
  });
});
