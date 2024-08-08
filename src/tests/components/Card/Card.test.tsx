import { Card } from '@/components';
import { CardProps } from '@/components/Card/Card.props';
import { makeStore } from '@/lib/store';
import { CardType } from '@/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
  usePathname: vi.fn(),
  useSearchParams: vi.fn().mockReturnValue({
    toString: vi.fn(),
  }),
}));

describe('Card', () => {
  const renderComponent = async (props: CardProps) => {
    const pushMock = vi.fn();

    const navigationModule = await import('next/navigation');
    navigationModule.useRouter = vi.fn().mockReturnValue({
      push: pushMock,
    });

    render(
      <Provider store={makeStore()}>
        <Card {...props} />
      </Provider>
    );

    return {
      pushMock,
    };
  };

  it('should render the Card"', async () => {
    const card = {
      id: '1',
      name: 'card1',
      flavorText: 'flavorText1',
      images: { small: '/small1', large: '/large1' },
    } as CardType;

    await renderComponent({
      item: card,
    });

    const img = screen.getByRole('img');
    const name = screen.getByText(card.name);
    const description = screen.getByText(card.flavorText!);

    expect(img).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should render the Card without description"', async () => {
    const card = {
      id: '1',
      name: 'card1',
      images: { small: '/small1', large: '/large1' },
    } as CardType;

    await renderComponent({
      item: card,
    });

    const noDescription = screen.getByText(/no description/i);
    expect(noDescription).toBeInTheDocument();
  });

  it('should set search param upon click', async () => {
    const card = {
      id: '1',
      name: 'card1',
      images: { small: '/small1', large: '/large1' },
    } as CardType;

    const { pushMock } = await renderComponent({
      item: card,
    });

    const cardElement = screen.getByRole('listitem');

    const user = userEvent.setup();
    await user.click(cardElement);

    expect(pushMock).toHaveBeenCalled();
  });
});
