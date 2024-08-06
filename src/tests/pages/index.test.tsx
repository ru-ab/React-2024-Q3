import Home from '@/pages';
import { render, screen } from '@testing-library/react';

vi.mock('@/store/store', () => ({
  wrapper: { useHydration: vi.fn(), getServerSideProps: vi.fn() },
}));

vi.mock('@/components', () => ({
  CardList: () => <div>CardList</div>,
  Flyout: () => <div>Flyout</div>,
  Header: () => <div>Header</div>,
  Panel: () => <div>Panel</div>,
}));

vi.mock('@/hooks/useHideDetailedCard', () => ({
  useHideDetailedCard: vi.fn().mockReturnValue({ hideDetailedCard: vi.fn() }),
}));

describe('Home', () => {
  it('should render Home page', () => {
    render(<Home />);

    expect(screen.getByText('CardList')).toBeInTheDocument();
    expect(screen.getByText('Flyout')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Panel')).toBeInTheDocument();
  });
});
