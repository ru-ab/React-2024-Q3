'use client';
import { useSearchParamsBuilder } from './useSearchParamsBuilder';

export function useHideDetailedCard() {
  const params = useSearchParamsBuilder();

  const hideDetailedCard = () => {
    const details = params?.get('details');
    if (!details) {
      return;
    }

    params.delete('details').apply({ scroll: false });
  };

  return {
    hideDetailedCard,
  };
}
