import { CardList, Flyout, Header, Panel } from '@/components';
import { useHideDetailedCard, useTheme } from '@/hooks';
import { api } from '@/services';
import { wrapper } from '@/store/store';
import { extractPageParams } from '@/utils';
import { GetServerSideProps } from 'next';
import { MouseEvent } from 'react';
import styles from './index.module.css';

export default function Home() {
  const { theme } = useTheme();
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
      <Header />
      <main className={`${styles['main']} ${styles[theme]}`}>
        <CardList />
      </main>
      <Panel />
      <Flyout />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { search, page, pageSize } = extractPageParams(context.query);

    store.dispatch(
      api.endpoints.getCards.initiate({
        search,
        page,
        pageSize,
      })
    );

    const cardId = context.query['details']?.toString();
    if (cardId) {
      store.dispatch(api.endpoints.getCard.initiate({ cardId }));
    }

    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

    return { props: {} };
  });
