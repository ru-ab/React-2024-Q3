import { Header } from '@/components';
import { render, screen } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
  usePathname: vi.fn().mockReturnValue('pathname'),
  useSearchParams: vi.fn().mockReturnValue({
    toString: vi.fn(),
  }),
}));

describe('Header', () => {
  const renderComponent = async () => {
    render(<Header />);
  };

  it('should render Header', async () => {
    await renderComponent();

    const logo = screen.getByText('Pokémon TCG');
    const input = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', { name: /search/i });
    const throwButton = screen.getByRole('button', { name: /throw/i });

    expect(logo).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(throwButton).toBeInTheDocument();
  });
});
