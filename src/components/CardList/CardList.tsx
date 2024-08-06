import { Card, Paginator, Spinner } from '@/components';
import { useCards, useLoading, useTheme } from '@/hooks';
import { extractPageParams } from '@/utils';
import { useRouter } from 'next/router';
import styles from './CardList.module.css';

export function CardList() {
  const loading = useLoading(['page', 'search']);
  const { theme } = useTheme();
  const router = useRouter();

  const { search, page, pageSize } = extractPageParams(router.query);
  const { response, isFetching } = useCards({
    search,
    page,
    pageSize,
  });

  if (loading || isFetching) {
    return <Spinner className={styles['spinner']} />;
  }

  if (!response?.data.length) {
    return (
      <div className={`${styles['no-items']} ${styles[theme]}`}>No items</div>
    );
  }

  const onPage = (pageNumber: number) => {
    router.replace({
      query: {
        ...(search ? { search } : {}),
        page: pageNumber,
      },
    });
  };

  const PaginatorComponent = (
    <Paginator
      className={styles['paginator']}
      page={page}
      onPage={onPage}
      pageSize={pageSize ?? 20}
      totalCount={response.totalCount}
    />
  );

  return (
    <>
      {PaginatorComponent}
      <ul className={styles['list']}>
        {response.data.map((card) => (
          <Card key={card.id} item={card} />
        ))}
      </ul>
      {PaginatorComponent}
    </>
  );
}
