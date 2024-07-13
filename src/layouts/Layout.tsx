import { Outlet, useSearchParams } from 'react-router-dom';
import { Header, CardList, Spinner, Paginator } from '../components';
import { useItems, useSearch } from '../hooks';
import styles from './Layout.module.css';
import { MouseEvent } from 'react';

export function Layout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, setSearch } = useSearch();
  const { items, loading, totalCount } = useItems({
    search,
    page: Number(searchParams.get('page')),
  });

  const cleanDetails = (event: MouseEvent) => {
    const cardElement = (event.target as HTMLElement).closest('li');
    if (cardElement) {
      return;
    }

    const detailedCardElement = (event.target as HTMLElement).closest('aside');
    if (detailedCardElement) {
      return;
    }

    setSearchParams((params) => {
      params.delete('details');
      return params;
    });
  };

  const onPage = (pageNumber: number) => {
    setSearchParams((params) => {
      params.set('page', String(pageNumber));
      return params;
    });
  };

  const PaginatorComponent = (
    <Paginator
      className={styles['paginator']}
      page={searchParams.get('page') ? Number(searchParams.get('page')) : null}
      onPage={onPage}
      pageSize={20}
      totalCount={totalCount}
    />
  );

  return (
    <div className={styles['page']} onClick={cleanDetails}>
      <Header
        search={search}
        setSearch={(searchText) => {
          setSearch(searchText);
          setSearchParams((params) => {
            params.delete('page');
            return params;
          });
        }}
      />
      <main className={styles['main']}>
        {loading ? (
          <Spinner className={styles['spinner']} />
        ) : (
          <>
            {PaginatorComponent}
            <CardList items={items} />
            {PaginatorComponent}
          </>
        )}
      </main>
      <Outlet />
    </div>
  );
}
