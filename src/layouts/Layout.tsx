import { CardList, Flyout, Header } from '@/components';
import { useHideDetailedCard, useSearch } from '@/hooks';
import { MouseEvent } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
  const { search, setSearch } = useSearch();
  const { hideDetailedCard } = useHideDetailedCard();

  const cleanDetails = (event: MouseEvent) => {
    const ignoreClickElement = (event.target as HTMLElement).closest(
      'aside,input,li'
    );
    if (ignoreClickElement) {
      return;
    }

    hideDetailedCard();
  };

  return (
    <div className={styles['page']} onClick={cleanDetails}>
      <Header search={search} setSearch={setSearch} />
      <main className={styles['main']}>
        <CardList search={search} />
      </main>
      <Outlet />
      <Flyout />
    </div>
  );
}
