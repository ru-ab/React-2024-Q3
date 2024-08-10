import { Card } from '@/components/Card/Card';
import { CardProps } from '@/components/Card/Card.props';
import { store } from '@/store/store';
import { CardType } from '../../../../app/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

vi.mock('react-router-dom');

describe('Card', () => {
  const renderComponent = async (props: CardProps) => {
    const setSearchParamsMock = vi.fn();
    const routerModule = await import('react-router-dom');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([{}, setSearchParamsMock]);

    render(
      <Provider store={store}>
        <Card {...props} />
      </Provider>
    );

    return {
      setSearchParamsMock,
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

    const { setSearchParamsMock } = await renderComponent({
      item: card,
    });

    const cardElement = screen.getByRole('listitem');

    const user = userEvent.setup();
    await user.click(cardElement);

    expect(setSearchParamsMock).toHaveBeenCalled();
  });
});
