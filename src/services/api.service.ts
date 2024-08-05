import { AppState } from '@/store/store';
import {
  CardType,
  GetCardRequest,
  GetCardResponse,
  GetCardsRequest,
  GetCardsResponse,
} from '@/types';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import {
  CombinedState,
  createApi,
  EndpointDefinitions,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

function isHydrateAction(action: Action): action is PayloadAction<AppState> {
  return action.type === HYDRATE;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pokemontcg.io/v2' }),
  endpoints: (builder) => ({
    getCards: builder.query<GetCardsResponse, GetCardsRequest>({
      query: ({ page, pageSize, search }) => {
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
        return `cards?${params.join('&')}`;
      },
    }),
    getCard: builder.query<CardType, GetCardRequest>({
      query: ({ cardId }) => `cards/${cardId}`,
      transformResponse: (response: GetCardResponse) => response.data,
    }),
  }),
  extractRehydrationInfo(
    action,
    { reducerPath }
  ): CombinedState<EndpointDefinitions, never, 'api'> | undefined {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
});
