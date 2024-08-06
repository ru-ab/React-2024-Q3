import { CardList } from '@/components';
import { createStore } from '@/store/store';
import { db } from '@/tests/db';
import { server } from '@/tests/server';
import { simulateDelay } from '@/tests/utils';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/hooks/useLoading');

type RenderComponentProps = {
  loading?: boolean;
  search?: string;
  page?: string;
};

describe('CardList', () => {
  const cards: ReturnType<typeof db.card.create>[] = [];

  const renderComponent = async ({ loading }: RenderComponentProps) => {
    const replace = vi.fn();

    const routerModule = await import('next/router');
    routerModule.useRouter = vi.fn().mockReturnValue({
      query: {},
      replace,
    });

    const loadingModule = await import('@/hooks/useLoading');
    loadingModule.useLoading = vi.fn().mockReturnValue(loading);

    render(
      <Provider store={createStore()}>
        <CardList />
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

  it('should show spinner while loading', async () => {
    simulateDelay(`*/cards`);

    await renderComponent({ loading: true });

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('should show "no items"', async () => {
    server.use(http.get(`*/cards`, () => HttpResponse.json({ data: [] })));

    await renderComponent({});
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
    expect(screen.getByText(/no items/i)).toBeInTheDocument();
  });

  it('should render items', async () => {
    await renderComponent({});
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    const list = screen.queryByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(cards.length);
  });
});
