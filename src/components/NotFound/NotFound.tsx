import { Button } from '@/components';
import { useTheme } from '@/hooks';
import { useRouter } from 'next/router';
import styles from './NotFound.module.css';

export function NotFound() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className={`${styles['wrapper']} ${styles[theme]}`}>
      <p className={`${styles['message']} ${styles[theme]}`}>
        This page not exists. You can follow the home link.
      </p>
      <Button size="l" onClick={() => router.push('/')}>
        To Home Page
      </Button>
    </div>
  );
}
