import { CardType } from '../types';
import { API } from './api';

export type GetItemsRequest = {
  search?: string;
  page?: number;
  pageSize?: number;
  signal: AbortSignal;
};

export type GetItemsResponse = {
  data: CardType[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

export async function getItems({
  search,
  page,
  pageSize,
  signal,
}: GetItemsRequest): Promise<GetItemsResponse> {
  const params: string[] = [];
  params.push(`select=id,name,images,flavorText`);
  if (page) {
    params.push(`page=${page}`);
  }
  if (pageSize) {
    params.push(`pageSize=${pageSize}`);
  }
  if (search) {
    params.push(`q=name:*${search}*`);
  }

  const response = await fetch(`${API.cards}?${params.join('&')}`, { signal });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
