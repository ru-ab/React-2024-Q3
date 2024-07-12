import { useEffect, useState } from 'react';
import styles from './MainPage.module.css';
import { BuggyButton, ListItems, Search, Spinner } from '../../components';
import { MainPageProps } from './MainPage.props';
import { GetItemsRequest, getItems } from '../../api';
import { Card } from '../../types';
import { useSearch } from '../../hooks';

export function MainPage(props: MainPageProps) {
  const { search, setSearch } = useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Card[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function requestItems() {
      try {
        setLoading(true);

        let request: GetItemsRequest = {
          signal: abortController.signal,
        };

        if (search) {
          request = {
            ...request,
            search,
            pageSize: 20,
          };
        }

        const { data } = await getItems(request);
        setItems(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof DOMException) {
          return;
        }

        setItems([]);
        setLoading(false);
      }
    }

    requestItems();

    return () => abortController.abort();
  }, [search]);

  return (
    <div className={styles['page']} {...props}>
      <header className={styles['header']}>
        <div className={styles['logo']}>Pokémon TCG</div>
        <Search search={search} setSearch={setSearch} />
        <BuggyButton />
      </header>
      <main className={styles['main']}>
        {loading ? (
          <Spinner className={styles['spinner']} />
        ) : (
          <ListItems items={items} />
        )}
      </main>
    </div>
  );
}
