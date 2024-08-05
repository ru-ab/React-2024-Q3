import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useLoading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = (_: string, options: { shallow: boolean }) => {
      if (options.shallow) {
        return;
      }

      setLoading(true);
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
  }, [router.events, router.query]);

  return loading;
}
