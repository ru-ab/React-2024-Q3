import { Card, Paginator, Spinner } from '@/components';
import { useCards, useLoading, useTheme } from '@/hooks';
import { extractPageParams } from '@/utils';
import { useRouter } from 'next/router';
import styles from './CardList.module.css';

export function CardList() {
  const router = useRouter();
  const loading = useLoading();
  const { theme } = useTheme();

  const { search, page, pageSize } = extractPageParams(router.query);

  const { response, error, isFetching } = useCards({
    search,
    page,
    pageSize,
  });

  if (loading || isFetching) {
    return <Spinner className={styles['spinner']} />;
  }

  if (error || !response?.data.length) {
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
        {response.data.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
      {PaginatorComponent}
    </>
  );
}
