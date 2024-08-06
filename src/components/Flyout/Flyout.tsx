import { Button } from '@/components';
import { selectedCardsActions, selectSelectedCards } from '@/features';
import { useTheme } from '@/hooks';
import { convertCardsToCsv, downloadCsv } from '@/utils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styles from './Flyout.module.css';

export function Flyout() {
  const selectedCards = useSelector(selectSelectedCards, shallowEqual);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const count = selectedCards.length;

  const unselectAll = () => dispatch(selectedCardsActions.unselectAll());

  const saveToCsv = () => {
    downloadCsv(convertCardsToCsv(selectedCards), `${count}_pokemon_tcg_cards`);
  };

  return (
    <div className={`${styles['flyout']} ${count ? styles['show'] : ''}`}>
      <div className={`${styles['surface']} ${styles[theme]}`}>
        <span>
          {count}
          {count === 0 || count > 1 ? ' items are ' : ' item is '}
          selected
        </span>
        <Button onClick={unselectAll}>Unselect all</Button>
        <Button onClick={saveToCsv}>Download</Button>
      </div>
    </div>
  );
}
