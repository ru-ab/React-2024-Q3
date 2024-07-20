import { Panel } from '@/components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom');

vi.mock('@/components/DetailedCard/DetailedCard', () => ({
  DetailedCard: () => <div>DetailedCard</div>,
}));

describe('Panel', () => {
  const renderComponent = async () => {
    const searchParamsMock = { get: vi.fn().mockReturnValue('cardId') };
    const setSearchParamsMock = vi.fn();

    const routerModule = await import('react-router-dom');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([searchParamsMock, setSearchParamsMock]);

    render(<Panel />);

    return {
      setSearchParamsMock,
    };
  };

  it('should render the panel', async () => {
    await renderComponent();

    const button = screen.getByRole('button', { name: /x/i });
    const detailedCard = screen.getByText('DetailedCard');

    expect(button).toBeInTheDocument();
    expect(detailedCard).toBeInTheDocument();
  });

  it('should remove search param upon clicking close panel button', async () => {
    const { setSearchParamsMock } = await renderComponent();

    const button = screen.getByRole('button', { name: /x/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(setSearchParamsMock).toHaveBeenCalled();
  });
});
