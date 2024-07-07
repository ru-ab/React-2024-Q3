import { Card } from '../../types';

export type MainPageState = {
  search: string;
  items: Card[];
  loading: boolean;
};
