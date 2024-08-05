import { Card } from '@/components';
import { CardProps } from '@/components/Card/Card.props';
import { makeStore } from '@/store/store';
import { CardType } from '@/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

vi.mock('next/router');

describe('Card', () => {
  const renderComponent = async (props: CardProps) => {
    const replaceMock = vi.fn();

    const routerModule = await import('next/router');
    routerModule.useRouter = vi.fn().mockReturnValue({ replace: replaceMock });

    render(
      <Provider store={makeStore()}>
        <Card {...props} />
      </Provider>
    );

    return {
      replaceMock,
    };
  };

  it('should render the Card"', async () => {
    const card = {
      id: '1',
      name: 'card1',
      flavorText: 'flavorText1',
      images: { small: 'small1', large: 'large1' },
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
      images: { small: 'small1', large: 'large1' },
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
      images: { small: 'small1', large: 'large1' },
    } as CardType;

    const { replaceMock } = await renderComponent({
      item: card,
    });

    const cardElement = screen.getByRole('listitem');

    const user = userEvent.setup();
    await user.click(cardElement);

    expect(replaceMock).toHaveBeenCalled();
  });
});
