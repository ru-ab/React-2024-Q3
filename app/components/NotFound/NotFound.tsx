import { Link } from '@remix-run/react';
import { Button } from '~/components';
import { useTheme } from '~/hooks';
import styles from './NotFound.module.css';

export function NotFound() {
  const { theme } = useTheme();

  return (
    <div className={`${styles['wrapper']} ${styles[theme]}`}>
      <p className={`${styles['message']} ${styles[theme]}`}>
        This page not exists. You can follow the home link.
      </p>
      <Link to="/">
        <Button size="l">To Home Page</Button>
      </Link>
    </div>
  );
}
