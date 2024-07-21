import { Button, DetailedCard } from '@/components';
import { useHideDetailedCard } from '@/hooks';
import { useSearchParams } from 'react-router-dom';
import styles from './Panel.module.css';

export function Panel() {
  const [searchParams] = useSearchParams();
  const { hideDetailedCard } = useHideDetailedCard();

  const cardId = searchParams.get('details');
  if (!cardId) {
    return <></>;
  }

  return (
    <aside className={styles['panel']}>
      <div className={styles['wrapper']}>
        <div className={styles['surface']}>
          <Button
            className={styles['close-button']}
            onClick={hideDetailedCard}
            appearance="surface"
          >
            X
          </Button>
          <DetailedCard cardId={cardId} />
        </div>
      </div>
    </aside>
  );
}
