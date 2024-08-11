import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DetailedCard } from '~/components';
import { DetailedCardProps } from '~/components/DetailedCard/DetailedCard.props';
import { store } from '~/store/store';
import { Ability, CardType } from '~/types';
import { db } from '../../db';

vi.mock('@/components/Attacks/Attacks', () => ({
  Attacks: () => <div>Attacks</div>,
}));

describe('DetailedCard', () => {
  const cards: ReturnType<typeof db.card.create>[] = [];

  const renderComponent = ({ card }: DetailedCardProps) => {
    render(
      <Provider store={store}>
        <DetailedCard card={card} />
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
      });
      cards.push(card);
    });
  });

  afterAll(() => {
    db.card.deleteMany({ where: { id: { in: cards.map((card) => card.id) } } });
  });

  it('should render the DetailedCard', async () => {
    renderComponent({ card: cards[0] as CardType });

    const img = screen.getByRole('img');
    const name = screen.getByText(cards[0].name);
    const description = screen.getByText(cards[0].flavorText!);

    expect(img).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
