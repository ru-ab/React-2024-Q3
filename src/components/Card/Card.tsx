import { CardCheckbox } from '@/components';
import { useTheme } from '@/hooks';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import styles from './Card.module.css';
import { CardProps } from './Card.props';
import Image from 'next/image';

export function Card({ item, ...props }: CardProps) {
  const router = useRouter();
  const { theme } = useTheme();

  const setDetailedCardParam = (event: MouseEvent) => {
    const checkboxElement = (event.target as HTMLElement).closest('input');
    if (checkboxElement) {
      return;
    }

    router.replace(
      {
        query: {
          ...router.query,
          details: item.id,
        },
      },
      undefined,
      { scroll: false, shallow: true }
    );
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
