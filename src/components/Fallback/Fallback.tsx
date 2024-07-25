import { Button } from '@/components';
import { useTheme } from '@/hooks';
import styles from './Fallback.module.css';

export function Fallback() {
  const { theme } = useTheme();

  return (
    <div className={`${styles['wrapper']} ${styles[theme]}`}>
      <p className={styles['message']}>Something went wrong</p>
      <Button size="l" onClick={() => window.location.reload()}>
        Refresh
      </Button>
    </div>
  );
}
