import { Button } from '~/components';
import styles from './Fallback.module.css';

export function Fallback() {
  return (
    <div className={styles['wrapper']}>
      <p className={styles['message']}>Something went wrong</p>
      <Button size="l" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
}
