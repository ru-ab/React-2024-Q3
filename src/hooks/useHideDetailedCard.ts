'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useHideDetailedCard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const deleteQueryString = useCallback(
    (name: string) => {
      if (!searchParams) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  const hideDetailedCard = () => {
    const details = searchParams?.get('details');
    if (!details) {
      return;
    }

    router.push(`${pathname}?${deleteQueryString('details')}`, {
      scroll: false,
    });
  };

  return {
    hideDetailedCard,
  };
}
