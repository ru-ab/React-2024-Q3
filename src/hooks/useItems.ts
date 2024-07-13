import { useEffect, useState } from 'react';
import { CardType } from '../types';
import { getItems, GetItemsRequest } from '../api';

type UseItemsProps = {
  search: string;
  page?: number;
};

export function useItems({ search, page }: UseItemsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<CardType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function requestItems() {
      try {
        setLoading(true);

        const pageParam = page
          ? {
              page,
              pageSize: 20,
            }
          : {};

        const searchParam = search
          ? {
              search,
              pageSize: 20,
            }
          : {};

        const request: GetItemsRequest = {
          signal: abortController.signal,
          ...pageParam,
          ...searchParam,
        };

        const { data, totalCount } = await getItems(request);
        setItems(data);
        setTotalCount(totalCount);
        setLoading(false);
      } catch (error) {
        if (error instanceof DOMException) {
          return;
        }

        setItems([]);
        setTotalCount(0);
        setLoading(false);
      }
    }

    requestItems();

    return () => abortController.abort();
  }, [search, page]);

  return {
    items,
    totalCount,
    loading,
  };
}
