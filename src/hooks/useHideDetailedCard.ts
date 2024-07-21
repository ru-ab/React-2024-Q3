import { detailedCardActions } from '@/features';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export function useHideDetailedCard() {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const hideDetailedCard = () => {
    setSearchParams((params) => {
      params.delete('details');
      return params;
    });
    dispatch(detailedCardActions.setDetailedCard(null));
  };

  return {
    hideDetailedCard,
  };
}
