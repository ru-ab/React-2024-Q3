import { CardProps } from './Card.props';
import styles from './Card.module.css';

export function Card({ item, ...props }: CardProps) {
  return (
    <li key={item.id} className={styles['list-item']} {...props}>
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
  );
}
