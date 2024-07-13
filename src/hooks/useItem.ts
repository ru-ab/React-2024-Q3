import { useEffect, useState } from 'react';
import { CardType } from '../types';
import { getItem, GetItemRequest } from '../api';

export function useItem(id: string | null) {
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<CardType | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function requestItem(id: string) {
      try {
        setLoading(true);

        const request: GetItemRequest = {
          id,
          signal: abortController.signal,
        };

        const { data } = await getItem(request);
        setItem(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof DOMException) {
          return;
        }

        setItem(null);
        setLoading(false);
      }
    }

    if (id) {
      requestItem(id);
    } else {
      setItem(null);
      setLoading(false);
    }

    return () => abortController.abort();
  }, [id]);

  return {
    item,
    loading,
  };
}
