import { useState } from 'react';

const SEARCH_ITEM = 'search';

export function useSearch() {
  const [search, setSearch] = useState<string>(
    () => localStorage.getItem(SEARCH_ITEM) ?? ''
  );

  return {
    search,
    setSearch: (search: string) => {
      localStorage.setItem(SEARCH_ITEM, search.trim());
      setSearch(search.trim());
    },
  };
}
