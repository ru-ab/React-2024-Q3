import { Checkbox } from '@/components';
import { selectedCardsActions, selectSelectedById } from '@/features';
import { useDispatch, useSelector } from 'react-redux';
import { CardCheckboxProps } from './CardCheckbox.props';

export function CardCheckbox({ cardId }: CardCheckboxProps) {
  const selected = useSelector(selectSelectedById(cardId));
  const dispatch = useDispatch();

  const onChange = () => {
    dispatch(selectedCardsActions.toggle(cardId));
  };

  return <Checkbox checked={selected} onChange={onChange} />;
}
