import { detailedCardActions } from '@/features';
import { api } from '@/services';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

type UseCardProps = {
  cardId: string;
};

export function useCard({ cardId }: UseCardProps) {
  const dispatch = useDispatch();
  const { data: card, isFetching, error } = api.useGetCardQuery({ cardId });

  useEffect(() => {
    if (!card) {
      return;
    }

    dispatch(detailedCardActions.setDetailedCard(card));
  }, [dispatch, card]);

  return {
    card,
    isFetching,
    error,
  };
}
