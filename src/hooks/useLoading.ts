import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useLoading(searchParamNames: string[], loadingIfNull = true) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const previousParams = searchParamNames.reduce(
      (params, v) => params + (router.query[v]?.toString() ?? ''),
      ''
    );

    const start = (urlString: string, options: { shallow: boolean }) => {
      if (options.shallow) {
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

    const end = (_: string, options: { shallow: boolean }) => {
      if (options.shallow) {
        return;
      }

      setLoading(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router.events, router.query, searchParamNames, loadingIfNull]);

  return loading;
}
