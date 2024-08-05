import { Header } from '@/components';
import { render, screen } from '@testing-library/react';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Header', () => {
  const renderComponent = async () => {
    const routerModule = await import('next/router');
    routerModule.useRouter = vi.fn().mockReturnValue({
      query: {},
    });

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
