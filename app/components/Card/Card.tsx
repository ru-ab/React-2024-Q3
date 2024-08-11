import { useSearchParams } from '@remix-run/react';
import { MouseEvent } from 'react';
import { CardCheckbox } from '~/components';
import { useTheme } from '~/hooks';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export function Card({ item, ...props }: CardProps) {
  const [, setSearchParams] = useSearchParams();
  const { theme } = useTheme();

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
      className={`${styles['list-item']} ${styles[theme]}`}
      onClick={setDetailedCardParam}
      {...props}
    >
      <div className={styles['wrapper']}>
        <img
          src={item.images.small}
          alt={item.name}
          className={`${styles['image']} ${styles[theme]}`}
        />
        <div className={styles['name']}>
          <CardCheckbox card={item} />
          {item.name}
        </div>
        <div className={styles['description']}>
          {item.flavorText ? item.flavorText : 'No description'}
        </div>
      </div>
    </li>
  );
}
