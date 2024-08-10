import { CardType } from './card.type';

export type GetCardsRequest = {
  page: string | null;
  pageSize: string | null;
  search: string | null;
};

export type GetCardsResponse = {
  data: CardType[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
};

export type GetCardRequest = {
  cardId: string;
};

export type GetCardResponse = {
  data: CardType;
};
