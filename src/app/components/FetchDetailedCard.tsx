import { DetailedCard } from '@/components';
import { CardType, GetCardRequest, GetCardResponse } from '@/types';

async function getCard({ cardId }: GetCardRequest): Promise<CardType> {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`);
  const card = (await res.json()) as GetCardResponse;
  return card.data;
}

export default async function FetchDetailedCard({ cardId }: GetCardRequest) {
  const card = await getCard({ cardId });

  return <DetailedCard card={card} />;
}
