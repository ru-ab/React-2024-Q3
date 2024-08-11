import { Card } from '~/components';
import { useTheme } from '~/hooks';
import styles from './CardList.module.css';
import { CardListProps } from './CardList.props';

export function CardList({ cards }: CardListProps) {
  const { theme } = useTheme();

  if (!cards.length) {
    return (
      <div className={`${styles['no-items']} ${styles[theme]}`}>No items</div>
    );
  }

  return (
    <ul className={styles['list']}>
      {cards.map((card) => (
        <Card key={card.id} item={card} />
      ))}
    </ul>
  );
}
