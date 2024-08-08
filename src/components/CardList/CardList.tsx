'use client';
import { Card, Paginator } from '@/components';
import { useSearchParamsBuilder, useTheme } from '@/hooks';
import styles from './CardList.module.css';
import { CardListProps } from './CardList.props';

export function CardList({ cards, page, pageSize, totalCount }: CardListProps) {
  const { theme } = useTheme();
  const params = useSearchParamsBuilder();

  const onPage = (pageNumber: number) => {
    params.set('page', pageNumber.toString()).delete('details').apply();
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
