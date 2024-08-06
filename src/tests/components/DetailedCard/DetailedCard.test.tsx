import { DetailedCard } from '@/components';
import { DetailedCardProps } from '@/components/DetailedCard/DetailedCard.props';
import { createStore } from '@/store/store';
import { db } from '@/tests/db';
import { simulateDelay } from '@/tests/utils';
import { Ability } from '@/types';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Provider } from 'react-redux';

vi.mock('@/components/Attacks/Attacks', () => ({
  Attacks: () => <div>Attacks</div>,
}));

describe('DetailedCard', () => {
  const cards: ReturnType<typeof db.card.create>[] = [];

  const renderComponent = ({ cardId }: DetailedCardProps) => {
    render(
      <Provider store={createStore()}>
        <DetailedCard cardId={cardId} />
      </Provider>
    );
  };

  beforeAll(() => {
    [1, 2, 3].forEach((n) => {
      const card = db.card.create({
        id: crypto.randomUUID(),
        name: 'Card' + n,
        flavorText: 'Description' + n,
        abilities: [{ name: 'ability' + n }] as Ability[],
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

  it('should render the DetailedCard', async () => {
    renderComponent({ cardId: cards[0].id });
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    const img = screen.getByRole('img');
    const name = screen.getByText(cards[0].name);
    const description = screen.getByText(cards[0].flavorText!);

    expect(img).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should render spinner while loading', async () => {
    simulateDelay(`*/cards/${cards[0].id}`);

    renderComponent({ cardId: cards[0].id });

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });
});
