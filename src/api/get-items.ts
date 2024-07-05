import { Card } from '../types';
import { API } from './api';

export type GetItemsRequest = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export type GetItemsResponse = {
  data: Card[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

export async function getItems({
  search = '',
  page = 1,
  pageSize = 250,
}: GetItemsRequest): Promise<GetItemsResponse> {
  const params: string[] = [];
  params.push(`page=${page}`);
  params.push(`pageSize=${pageSize}`);
  params.push(`select=id,name,images,flavorText`);
  if (search) {
    params.push(`q=name:*${search}*`);
  }

  const response = await fetch(`${API.cards}?${params.join('&')}`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
