import { Panel } from '@/components';
import { createStore } from '@/store/store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/hooks/useLoading');

vi.mock('@/components/DetailedCard/DetailedCard', () => ({
  DetailedCard: () => <div>DetailedCard</div>,
}));

type RenderComponentProps = {
  details?: string;
  replace?: () => void;
};

describe('Panel', () => {
  const renderComponent = async ({
    details,
    replace,
  }: RenderComponentProps) => {
    const routerModule = await import('next/router');
    routerModule.useRouter = vi.fn().mockReturnValue({
      query: { details },
      replace,
    });

    const loadingModule = await import('@/hooks/useLoading');
    loadingModule.useLoading = vi.fn().mockReturnValue(false);

    render(
      <Provider store={createStore()}>
        <Panel />
      </Provider>
    );
  };

  it('should render the panel', async () => {
    await renderComponent({ details: 'cardId' });

    const button = screen.getByRole('button', { name: /x/i });
    const detailedCard = screen.getByText('DetailedCard');

    expect(button).toBeInTheDocument();
    expect(detailedCard).toBeInTheDocument();
  });

  it('should remove search param upon clicking close panel button', async () => {
    const replace = vi.fn();
    await renderComponent({ details: 'cardId', replace });

    const button = screen.getByRole('button', { name: /x/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(replace).toHaveBeenCalledWith({ query: {} }, undefined, {
      scroll: false,
      shallow: true,
    });
  });
});
