'use client';
import { Card, Paginator } from '@/components';
import { useTheme } from '@/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import styles from './CardList.module.css';
import { CardListProps } from './CardList.props';

export function CardList({ cards, page, pageSize, totalCount }: CardListProps) {
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
      params.delete('details');
      return params.toString();
    },
    [searchParams]
  );

  const onPage = (pageNumber: number) => {
    router.push(
      `${pathname}?${createQueryString('page', pageNumber.toString())}`
    );
  };

  if (!cards.length) {
    return (
      <div className={`${styles['no-items']} ${styles[theme]}`}>No items</div>
    );
  }

  const PaginatorComponent = (
    <Paginator
      page={page}
      pageSize={pageSize ?? 20}
      totalCount={totalCount}
      onPage={onPage}
      className={styles['paginator']}
    />
  );

  return (
    <>
      {PaginatorComponent}
      <ul className={styles['list']}>
        {cards.map((card) => (
          <Card key={card.id} item={card} />
        ))}
      </ul>
      {PaginatorComponent}
    </>
  );
}
