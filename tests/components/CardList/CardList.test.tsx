import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CardList } from '~/components';
import { store } from '~/store/store';
import { CardType } from '~/types';
import { db } from '../../db';

vi.mock('@remix-run/react');

type RenderComponentProps = {
  cards: CardType[];
};

describe('CardList', () => {
  const cards: ReturnType<typeof db.card.create>[] = [];

  const renderComponent = async ({ cards }: RenderComponentProps) => {
    const routerModule = await import('@remix-run/react');
    routerModule.useSearchParams = vi.fn().mockReturnValue([{}, vi.fn()]);

    render(
      <Provider store={store}>
        <CardList cards={cards as CardType[]} />
      </Provider>
    );
  };

  beforeAll(() => {
    [1, 2, 3].forEach((n) => {
      const card = db.card.create({
        id: crypto.randomUUID(),
        name: 'Card' + n,
      });
      cards.push(card);
    });
  });

  afterAll(() => {
    db.card.deleteMany({ where: { id: { in: cards.map((card) => card.id) } } });
  });

  it('should show "no items"', async () => {
    await renderComponent({ cards: [] });

    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
    expect(screen.getByText(/no items/i)).toBeInTheDocument();
  });

  it('should render items', async () => {
    await renderComponent({ cards: cards as CardType[] });

    const list = screen.queryByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(cards.length);
  });
});
