import { useNavigation, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';

export function useLoading(searchParamNames: string[], loadingIfNull = true) {
  const { state, location } = useNavigation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const previousParams = searchParamNames.reduce(
      (params, v) => params + (searchParams.get(v)?.toString() ?? ''),
      ''
    );

    const start = () => {
      const urlString = '/' + location?.search;
      if (!urlString) {
        return;
      }

      const url = new URL(urlString, window.location.origin);
      const currentParams = searchParamNames.reduce(
        (params, v) => params + (url.searchParams.get(v)?.toString() ?? ''),
        ''
      );

      if (
        previousParams !== currentParams &&
        (loadingIfNull || !!currentParams)
      ) {
        setLoading(true);
      }
    };

    const end = () => {
      setLoading(false);
    };

    if (state === 'loading') {
      start();
    }

    if (state === 'idle') {
      end();
    }
  }, [state, location, searchParams, loadingIfNull, searchParamNames]);

  return loading;
}
