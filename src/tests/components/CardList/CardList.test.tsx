import { CardList } from '@/components';
import { CardListProps } from '@/components/CardList/CardList.props';
import { makeStore } from '@/lib/store';
import { db } from '@/tests/db';
import { server } from '@/tests/server';
import { CardType } from '@/types';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
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

describe('CardList', () => {
  const cards: ReturnType<typeof db.card.create>[] = [];

  const renderComponent = async (props: CardListProps) => {
    render(
      <Provider store={makeStore()}>
        <CardList {...props} />
      </Provider>
    );
  };

  beforeAll(() => {
    [1, 2, 3].forEach((n) => {
      const card = db.card.create({
        id: crypto.randomUUID(),
        name: 'Card' + n,
        images: {
          small: '/small' + n,
          large: '/large' + n,
        },
      });
      cards.push(card);
    });
  });

  afterAll(() => {
    db.card.deleteMany({ where: { id: { in: cards.map((card) => card.id) } } });
  });

  it('should show "no items"', async () => {
    server.use(http.get(`*/cards`, () => HttpResponse.json({ data: [] })));

    await renderComponent({
      cards: [],
      page: null,
      pageSize: null,
      totalCount: 0,
    });

    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
    expect(screen.getByText(/no items/i)).toBeInTheDocument();
  });

  it('should render items', async () => {
    await renderComponent({
      cards: db.card.getAll() as CardType[],
      page: null,
      pageSize: 1,
      totalCount: db.card.count(),
    });

    const list = screen.queryByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(cards.length);
  });
});
