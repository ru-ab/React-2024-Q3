import { useEffect, useState } from 'react';
import { CardType } from '../types';
import { getItems, GetItemsRequest } from '../api';

export function useItems(search: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<CardType[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function requestItems() {
      try {
        setLoading(true);

        let request: GetItemsRequest = {
          signal: abortController.signal,
        };

        if (search) {
          request = {
            ...request,
            search,
            pageSize: 20,
          };
        }

        const { data } = await getItems(request);
        setItems(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof DOMException) {
          return;
        }

        setItems([]);
        setLoading(false);
      }
    }

    requestItems();

    return () => abortController.abort();
  }, [search]);

  return {
    items,
    loading,
  };
}
