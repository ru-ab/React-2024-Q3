import { PropsWithChildren } from 'react';
import styles from './Main.module.css';
import { useTheme } from '~/hooks';

export function Main({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <main className={`${styles['main']} ${styles[theme]}`}>{children}</main>
  );
}
