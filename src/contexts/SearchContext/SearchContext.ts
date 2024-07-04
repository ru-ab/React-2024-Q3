import { createContext } from 'react';

export type SearchContextType = {
  search: string;
  setSearch: (search: string) => void;
};

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);
