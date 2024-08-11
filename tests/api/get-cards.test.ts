import { getCards } from '~/api';
import { Ability } from '~/types';
import { db } from '../db';

describe('getCards', () => {
  const cards: ReturnType<typeof db.card.create>[] = [];

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

  it('should fetch cards', async () => {
    const response = await getCards({
      page: '1',
      pageSize: '20',
      search: 'test',
    });

    expect(response.data).toMatchObject(cards);
  });
});
