'use client';
import { Button } from '@/components';
import { useHideDetailedCard, useTheme } from '@/hooks';
import { PropsWithChildren } from 'react';
import styles from './Panel.module.css';

export function Panel({ children }: PropsWithChildren) {
  const { hideDetailedCard } = useHideDetailedCard();
  const { theme } = useTheme();

  return (
    <aside className={styles['panel']}>
      <div className={styles['wrapper']}>
        <div className={`${styles['surface']} ${styles[theme]}`}>
          <Button
            className={styles['close-button']}
            onClick={hideDetailedCard}
            appearance="primary"
          >
            X
          </Button>
          {children}
        </div>
      </div>
    </aside>
  );
}
