import { CardProps } from './Card.props';
import styles from './Card.module.css';
import { useSearchParams } from 'react-router-dom';

export function Card({ item, ...props }: CardProps) {
  const [, setSearchParams] = useSearchParams();

  const setDetailedCardParam = () => {
    setSearchParams((params) => {
      params.set('details', item.id);
      return params;
    });
  };

  return (
    <li
      key={item.id}
      className={styles['list-item']}
      onClick={setDetailedCardParam}
      {...props}
    >
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
