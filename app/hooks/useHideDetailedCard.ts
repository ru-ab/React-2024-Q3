import { useSearchParams } from '@remix-run/react';

export function useHideDetailedCard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const hideDetailedCard = () => {
    if (!searchParams.get('details')) {
      return;
    }

    setSearchParams((params) => {
      params.delete('details');
      return params;
    });
  };

  return {
    hideDetailedCard,
  };
}
