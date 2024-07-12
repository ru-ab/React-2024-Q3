import styles from './MainPage.module.css';
import { BuggyButton, ListItems, Search, Spinner } from '../../components';
import { MainPageProps } from './MainPage.props';
import { useItems, useSearch } from '../../hooks';

export function MainPage(props: MainPageProps) {
  const { search, setSearch } = useSearch();
  const { items, loading } = useItems(search);

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
