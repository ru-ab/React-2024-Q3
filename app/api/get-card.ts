import { GetCardRequest, GetCardResponse } from '~/types';

export async function getCard({
  cardId,
}: GetCardRequest): Promise<GetCardResponse> {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`);
  return res.json();
}
