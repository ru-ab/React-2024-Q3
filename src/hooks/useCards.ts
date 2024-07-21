import { currentPageCardsActions } from '@/features';
import { api } from '@/services';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

type UseCardsProps = {
  search?: string;
  page: number | null;
  pageSize: number | null;
};

export function useCards({ search, page, pageSize }: UseCardsProps) {
  const dispatch = useDispatch();
  const {
    data: response,
    error,
    isFetching,
  } = api.useGetCardsQuery({
    search,
    page,
    pageSize,
  });

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch(currentPageCardsActions.setCurrentPageCards(response.data));
  }, [dispatch, response]);

  return {
    response,
    isFetching,
    error,
  };
}
