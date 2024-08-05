import { detailedCardActions } from '@/features';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export function useHideDetailedCard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const hideDetailedCard = () => {
    if (!router.query['details']) {
      return;
    }

    const newQuery = { ...router.query };
    delete newQuery['details'];

    router.replace(
      {
        query: newQuery,
      },
      undefined,
      { scroll: false, shallow: true }
    );

    dispatch(detailedCardActions.setDetailedCard(null));
  };

  return {
    hideDetailedCard,
  };
}
