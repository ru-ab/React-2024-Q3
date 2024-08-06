import { Flyout } from '@/components';
import { selectedCardsActions } from '@/features';
import { createStore } from '@/store/store';
import { CardType } from '@/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

vi.mock('@/utils');

type RenderComponentProps = {
  selectedCards?: CardType[];
};

describe('Flyout', () => {
  const renderComponent = ({ selectedCards = [] }: RenderComponentProps) => {
    const store = createStore();
    selectedCards.forEach((card) =>
      store.dispatch(selectedCardsActions.toggle(card))
    );

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    return {
      store,
    };
  };

  it('should render Flyout with 0 items', () => {
    renderComponent({});

    const text = screen.getByText('0 items are selected');
    expect(text).toBeInTheDocument();
  });

  it('should render Flyout with 1 item', () => {
    renderComponent({
      selectedCards: [
        {
          id: '1',
          name: 'card 1',
        } as CardType,
      ],
    });

    const text = screen.getByText('1 item is selected');
    expect(text).toBeInTheDocument();
  });

  it('should render Flyout with 2 items', () => {
    renderComponent({
      selectedCards: [
        {
          id: '1',
          name: 'card 1',
        } as CardType,
        {
          id: '2',
          name: 'card 2',
        } as CardType,
      ],
    });

    const text = screen.getByText('2 items are selected');
    expect(text).toBeInTheDocument();
  });

  it('should unselect all items', async () => {
    renderComponent({
      selectedCards: [
        {
          id: '1',
          name: 'card 1',
        } as CardType,
        {
          id: '2',
          name: 'card 2',
        } as CardType,
      ],
    });

    const button = screen.getByRole('button', { name: /unselect/i });
    const user = userEvent.setup();
    await user.click(button);

    const text = screen.getByText('0 items are selected');
    expect(text).toBeInTheDocument();
  });

  it('should download selected items', async () => {
    const utilsModule = await import('@/utils');
    utilsModule.downloadCsv = vi.fn();
    utilsModule.convertCardsToCsv = vi
      .fn()
      .mockReturnValue('convertCardsToCsv');

    const selectedCards = [
      {
        id: '1',
        name: 'card 1',
      } as CardType,
      {
        id: '2',
        name: 'card 2',
      } as CardType,
    ];

    renderComponent({ selectedCards });

    const button = screen.getByRole('button', { name: /download/i });
    const user = userEvent.setup();
    await user.click(button);

    expect(utilsModule.convertCardsToCsv).toHaveBeenCalledWith(selectedCards);
    expect(utilsModule.downloadCsv).toHaveBeenCalledWith(
      'convertCardsToCsv',
      '2_pokemon_tcg_cards'
    );
  });
});
