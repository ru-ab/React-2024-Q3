import { Button, DetailedCard, Spinner } from '@/components';
import { useHideDetailedCard, useLoading, useTheme } from '@/hooks';
import styles from './Panel.module.css';
import { useRouter } from 'next/router';

export function Panel() {
  const { hideDetailedCard } = useHideDetailedCard();
  const { theme } = useTheme();
  const router = useRouter();
  const loading = useLoading(['details'], false);

  const cardId = router.query['details']?.toString() ?? null;
  if (!loading && !cardId) {
    return <></>;
  }

  return (
    <aside className={styles['panel']}>
      <div className={styles['wrapper']}>
        <div className={`${styles['surface']} ${styles[theme]}`}>
          <Button
            className={styles['close-button']}
            onClick={hideDetailedCard}
            appearance="primary"
          >
            X
          </Button>
          {loading && <Spinner className={styles['spinner']} />}
          {!loading && cardId && <DetailedCard cardId={cardId} />}
        </div>
      </div>
    </aside>
  );
}
