'use client';
import { useTheme } from '@/hooks';
import { PropsWithChildren } from 'react';
import styles from './Main.module.css';

export function Main({ children }: PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <main className={`${styles['main']} ${styles[theme]}`}>{children}</main>
  );
}
