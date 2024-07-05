import { createContext } from 'react';
import { Card } from '../../types';

export type ItemsContextState = {
  search: string;
  setSearch: (search: string) => void;
  items: Card[];
  loading: boolean;
};

export const ItemsContext = createContext<ItemsContextState>(
  {} as ItemsContextState
);
