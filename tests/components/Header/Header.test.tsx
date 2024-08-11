import { render, screen } from '@testing-library/react';
import { Header } from '~/components';

vi.mock('~/components/ThemeSwitch/ThemeSwitch', () => ({
  ThemeSwitch: () => <div>ThemeSwitch</div>,
  Search: () => <div>Search</div>,
  BuggyButton: () => <div>BuggyButton</div>,
}));

describe('Header', () => {
  const renderComponent = () => {
    render(<Header />);
  };

  it('should render Header', async () => {
    renderComponent();

    const logo = screen.getByText('Pokémon TCG');
    const search = screen.getByText('Search');
    const themeSwitch = screen.getByText('ThemeSwitch');
    const buggyButton = screen.getByText('BuggyButton');

    expect(logo).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(themeSwitch).toBeInTheDocument();
    expect(buggyButton).toBeInTheDocument();
  });
});
