import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SEARCH_ITEM = 'search';

export function useSearch() {
  const [, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    () => localStorage.getItem(SEARCH_ITEM) ?? ''
  );

  return {
    search,
    setSearch: (search: string) => {
      localStorage.setItem(SEARCH_ITEM, search.trim());
      setSearch(search.trim());
      setSearchParams((params) => {
        params.delete('page');
        return params;
      });
    },
  };
}
