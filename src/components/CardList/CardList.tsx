import { Card, Paginator, Spinner } from '@/components';
import { useCards, useTheme } from '@/hooks';
import { useSearchParams } from 'react-router-dom';
import styles from './CardList.module.css';
import { CardListProps } from './CardList.props';

const defaultPageSize = 20;

export function CardList({ search }: CardListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();

  const currentPage = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : null;

  const currentPageSize = currentPage ? defaultPageSize : null;

  const { response, error, isFetching } = useCards({
    search,
    page: currentPage,
    pageSize: currentPageSize,
  });

  if (isFetching) {
    return <Spinner className={styles['spinner']} />;
  }

  if (error || !response?.data.length) {
    return (
      <div className={`${styles['no-items']} ${styles[theme]}`}>No items</div>
    );
  }

  const onPage = (pageNumber: number) => {
    setSearchParams((params) => {
      params.set('page', String(pageNumber));
      return params;
    });
  };

  const PaginatorComponent = (
    <Paginator
      className={styles['paginator']}
      page={currentPage}
      onPage={onPage}
      pageSize={defaultPageSize}
      totalCount={response.totalCount}
    />
  );

  return (
    <>
      {PaginatorComponent}
      <ul className={styles['list']}>
        {response.data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
      {PaginatorComponent}
    </>
  );
}
