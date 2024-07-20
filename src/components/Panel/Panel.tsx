import { Button, DetailedCard } from '@/components';
import { useSearchParams } from 'react-router-dom';
import styles from './Panel.module.css';

export function Panel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const cardId = searchParams.get('details');

  const clearDetails = () => {
    setSearchParams((params) => {
      params.delete('details');
      return params;
    });
  };

  if (!cardId) {
    return <></>;
  }

  return (
    <aside className={styles['panel']}>
      <div className={styles['wrapper']}>
        <div className={styles['surface']}>
          <Button
            className={styles['close-button']}
            onClick={clearDetails}
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
