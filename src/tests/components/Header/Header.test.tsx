import { render, screen } from '@testing-library/react';
import { Header } from '../../../components';

describe('Header', () => {
  const renderComponent = () => {
    render(<Header search="" setSearch={() => {}} />);
  };

  it('should render Header', async () => {
    renderComponent();

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
