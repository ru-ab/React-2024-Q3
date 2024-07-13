import { CardListProps } from './CardList.props';
import styles from './CardList.module.css';
import { Card } from '../Card/Card';

export function CardList({ items, ...props }: CardListProps) {
  if (!items.length) {
    return <div className={styles['no-items']}>No items</div>;
  }

  return (
    <ul className={styles['list']} {...props}>
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </ul>
  );
}
