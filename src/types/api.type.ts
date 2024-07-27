import { CardType } from './card.type';

export type GetCardsRequest = {
  page: number | null;
  pageSize: number | null;
  search?: string;
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
