'use client';
import { CardCheckbox } from '@/components';
import { useSearchParamsBuilder, useTheme } from '@/hooks';
import Image from 'next/image';
import { MouseEvent } from 'react';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export function Card({ item, ...props }: CardProps) {
  const { theme } = useTheme();
  const params = useSearchParamsBuilder();

  const setDetailedCardParam = (event: MouseEvent) => {
    const checkboxElement = (event.target as HTMLElement).closest('input');
    if (checkboxElement) {
      return;
    }

    params.set('details', item.id).apply({
      scroll: false,
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
        <Image
          src={item.images.small}
          width={248}
          height={345}
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
