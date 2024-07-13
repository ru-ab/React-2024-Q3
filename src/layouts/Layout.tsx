import { Outlet } from 'react-router-dom';
import { Header, ListItems, Spinner } from '../components';
import { useItems, useSearch } from '../hooks';
import styles from './Layout.module.css';

export function Layout() {
  const { search, setSearch } = useSearch();
  const { items, loading } = useItems(search);

  return (
    <div className={styles['page']}>
      <Header search={search} setSearch={setSearch} />
      <main className={styles['main']}>
        {loading ? (
          <Spinner className={styles['spinner']} />
        ) : (
          <ListItems items={items} />
        )}
      </main>
      <Outlet />
    </div>
  );
}
