import { GetCardsRequest, GetCardsResponse } from '~/types';

export async function getCards({
  page,
  pageSize,
  search,
}: GetCardsRequest): Promise<GetCardsResponse> {
  const params: string[] = [];
  params.push(
    `select=id,name,images,flavorText,artist,hp,level,types,subtypes,abilities,attacks,weaknesses`
  );
  if (page) {
    params.push(`page=${page}`);
  }
  if (pageSize) {
    params.push(`pageSize=${pageSize}`);
  }
  if (search) {
    params.push(`q=name:*${search}*`);
  }

  const res = await fetch(
    `https://api.pokemontcg.io/v2/cards?${params.join('&')}`
  );

  return res.json();
}
