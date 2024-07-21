import { CardCheckbox } from '@/components';
import { MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export function Card({ item, ...props }: CardProps) {
  const [, setSearchParams] = useSearchParams();

  const setDetailedCardParam = (event: MouseEvent) => {
    const checkboxElement = (event.target as HTMLElement).closest('input');
    if (checkboxElement) {
      return;
    }

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
        <div className={styles['name']}>
          <CardCheckbox cardId={item.id} />
          {item.name}
        </div>
        <div className={styles['description']}>
          {item.flavorText ? item.flavorText : 'No description'}
        </div>
      </div>
    </li>
  );
}
