import { CardList } from '@/components';
import { api } from '@/services';
import { store } from '@/store/store';
import { db } from '@/tests/db';
import { baseUrl, server } from '@/tests/server';
import { simulateDelay } from '@/tests/utils';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Provider } from 'react-redux';

type RenderComponentProps = {
  search?: string;
  page?: string;
};

describe('CardList', () => {
  const cards: ReturnType<typeof db.card.create>[] = [];

  const renderComponent = async ({ search, page }: RenderComponentProps) => {
    const searchParamsMock = { get: vi.fn().mockReturnValue(page) };
    const setSearchParamsMock = vi.fn();

    const routerModule = await import('react-router-dom');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([searchParamsMock, setSearchParamsMock]);

    render(
      <Provider store={store}>
        <CardList search={search} />
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

  beforeEach(() => {
    store.dispatch(api.util.resetApiState());
  });

  afterAll(() => {
    db.card.deleteMany({ where: { id: { in: cards.map((card) => card.id) } } });
  });

  it('should show spinner while loading', async () => {
    simulateDelay(`${baseUrl}/cards`);

    await renderComponent({});

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('should show "no items"', async () => {
    server.use(
      http.get(`${baseUrl}/cards`, () => HttpResponse.json({ data: [] }))
    );

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
