import { CardType } from '../types';
import { API } from './api';

export type GetItemRequest = {
  id: string;
  signal: AbortSignal;
};

export type GetItemResponse = {
  data: CardType;
};

export async function getItem({
  id,
  signal,
}: GetItemRequest): Promise<GetItemResponse> {
  const response = await fetch(`${API.cards}/${id}`, { signal });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
