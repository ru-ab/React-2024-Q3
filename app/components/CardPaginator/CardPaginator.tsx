import { useSearchParams } from '@remix-run/react';
import { Paginator } from '~/components';
import styles from './CardPaginator.module.css';
import { CardPaginatorProps } from './CardPaginator.props';

export function CardPaginator({ page, totalCount }: CardPaginatorProps) {
  const [, setSearchParams] = useSearchParams();

  const onPage = (pageNumber: number) => {
    setSearchParams((params) => {
      params.set('page', String(pageNumber));
      params.delete('details');
      return params;
    });
  };

  return (
    <Paginator
      className={styles['paginator']}
      page={page ? Number(page) : null}
      onPage={onPage}
      pageSize={20}
      totalCount={totalCount}
    />
  );
}
