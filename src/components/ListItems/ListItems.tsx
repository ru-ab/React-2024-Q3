import { ListItemsProps } from './ListItems.props';
import styles from './ListItems.module.css';

export function ListItems({ items, ...props }: ListItemsProps) {
  if (!items.length) {
    return <div className={styles['no-items']}>No items</div>;
  }

  return (
    <ul className={styles['list']} {...props}>
      {items.map((item) => (
        <li key={item.id} className={styles['list-item']}>
          <div className={styles['wrapper']}>
            <img
              src={item.images.small}
              alt={item.name}
              className={styles['image']}
            />
            <div className={styles['name']}>{item.name}</div>
            <div className={styles['description']}>
              {item.flavorText ? item.flavorText : 'No description'}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
