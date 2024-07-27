import { Button, DetailedCard } from '@/components';
import { useHideDetailedCard, useTheme } from '@/hooks';
import { useSearchParams } from 'react-router-dom';
import styles from './Panel.module.css';

export function Panel() {
  const [searchParams] = useSearchParams();
  const { hideDetailedCard } = useHideDetailedCard();
  const { theme } = useTheme();

  const cardId = searchParams.get('details');
  if (!cardId) {
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
          <DetailedCard cardId={cardId} />
        </div>
      </div>
    </aside>
  );
}
