import { getCard } from '~/api';
import { Ability } from '~/types';
import { db } from '../db';

describe('getCard', () => {
  const cards: ReturnType<typeof db.card.create>[] = [];

  beforeAll(() => {
    [1].forEach((n) => {
      const card = db.card.create({
        id: 'id' + n,
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

  it('should fetch card', async () => {
    const response = await getCard({
      cardId: 'id1',
    });

    expect(response.data).toMatchObject(cards[0]);
  });
});
