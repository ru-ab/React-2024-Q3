import StoreProvider from '@/app/components/StoreProvider';
import { render, screen } from '@testing-library/react';

describe('StoreProvider', () => {
  it('should render children', () => {
    render(<StoreProvider>Children</StoreProvider>);

    const children = screen.getByText('Children');

    expect(children).toBeInTheDocument();
  });
});
