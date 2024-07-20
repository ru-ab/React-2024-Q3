import {
  CardType,
  GetCardRequest,
  GetCardResponse,
  GetCardsRequest,
  GetCardsResponse,
} from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl: string = import.meta.env.VITE_BASE_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCards: builder.query<GetCardsResponse, GetCardsRequest>({
      query: ({ page, pageSize, search }) => {
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
        return `cards?${params.join('&')}`;
      },
    }),
    getCard: builder.query<CardType, GetCardRequest>({
      query: ({ cardId }) => `cards/${cardId}`,
      transformResponse: (response: GetCardResponse) => response.data,
    }),
  }),
});
