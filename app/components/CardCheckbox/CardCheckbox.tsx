import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '~/components';
import { selectedCardsActions, selectSelectedById } from '~/features';
import { CardCheckboxProps } from './CardCheckbox.props';

export function CardCheckbox({ card }: CardCheckboxProps) {
  const selected = useSelector(selectSelectedById(card.id));
  const dispatch = useDispatch();

  const onChange = () => {
    dispatch(selectedCardsActions.toggle(card));
  };

  return <Checkbox checked={selected} onChange={onChange} />;
}
