import { Button } from '@/components';
import { useRouter } from 'next/router';
import styles from './NotFound.module.css';

export function NotFound() {
  const router = useRouter();

  return (
    <div className={styles['wrapper']}>
      <p className={styles['message']}>
        This page not exists. You can follow the home link.
      </p>
      <Button size="l" onClick={() => router.push('/')}>
        To Home Page
      </Button>
    </div>
  );
}
