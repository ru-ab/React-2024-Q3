import { Outlet, useSearchParams } from 'react-router-dom';
import { Header, CardList, Spinner } from '../components';
import { useItems, useSearch } from '../hooks';
import styles from './Layout.module.css';
import { MouseEvent } from 'react';

export function Layout() {
  const [, setSearchParams] = useSearchParams();
  const { search, setSearch } = useSearch();
  const { items, loading } = useItems(search);

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

  return (
    <div className={styles['page']} onClick={cleanDetails}>
      <Header search={search} setSearch={setSearch} />
      <main className={styles['main']}>
        {loading ? (
          <Spinner className={styles['spinner']} />
        ) : (
          <CardList items={items} />
        )}
      </main>
      <Outlet />
    </div>
  );
}
