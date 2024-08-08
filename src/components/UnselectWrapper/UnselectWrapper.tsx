'use client';
import { useHideDetailedCard } from '@/hooks';
import { MouseEvent, PropsWithChildren } from 'react';
import styles from './UnselectWrapper.module.css';

export function UnselectWrapper({ children }: PropsWithChildren) {
  const { hideDetailedCard } = useHideDetailedCard();

  const cleanDetails = (event: MouseEvent) => {
    const ignoreClickElement = (event.target as HTMLElement).closest(
      'aside,input,li,button'
    );

    if (ignoreClickElement) {
      return;
    }

    hideDetailedCard();
  };

  return (
    <div className={styles['wrapper']} onClick={cleanDetails}>
      {children}
    </div>
  );
}
