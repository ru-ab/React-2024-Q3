import { CardList, Header } from '@/components';
import { useSearch } from '@/hooks';
import { MouseEvent } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search, setSearch } = useSearch();

  const cleanDetails = (event: MouseEvent) => {
    if (!searchParams.get('details')) {
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
        <CardList search={search} />
      </main>
      <Outlet />
    </div>
  );
}
