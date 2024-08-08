'use client';
import { CardCheckbox } from '@/components';
import { useTheme } from '@/hooks';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent, useCallback } from 'react';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export function Card({ item, ...props }: CardProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (!searchParams) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const setDetailedCardParam = (event: MouseEvent) => {
    const checkboxElement = (event.target as HTMLElement).closest('input');
    if (checkboxElement) {
      return;
    }

    router.push(`${pathname}?${createQueryString('details', item.id)}`, {
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
