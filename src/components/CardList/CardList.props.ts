import { CardType } from '@/types';

export type CardListProps = {
  cards: CardType[];
  page: number | null;
  pageSize: number | null;
  totalCount: number;
};
