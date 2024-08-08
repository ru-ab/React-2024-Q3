import { Button } from '@/components';
import { useTheme } from '@/hooks';
import styles from './Fallback.module.css';
import { FallbackProps } from './Fallback.props';

export function Fallback({ reset }: FallbackProps) {
  const { theme } = useTheme();

  return (
    <div className={`${styles['wrapper']} ${styles[theme]}`}>
      <p className={styles['message']}>Something went wrong</p>
      <Button size="l" onClick={reset}>
        Refresh
      </Button>
    </div>
  );
}
