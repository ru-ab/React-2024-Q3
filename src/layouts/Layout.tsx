import { Header } from '@/components';
import { useHideDetailedCard } from '@/hooks';
import { MouseEvent, PropsWithChildren } from 'react';
import styles from './Layout.module.css';

export function Layout({ children }: PropsWithChildren) {
  const { hideDetailedCard } = useHideDetailedCard();

  const cleanDetails = (event: MouseEvent) => {
    const ignoreClickElement = (event.target as HTMLElement).closest(
      'aside,input,li'
    );
    if (ignoreClickElement) {
      return;
    }

    hideDetailedCard();
  };

  return (
    <div className={styles['page']} onClick={cleanDetails}>
      <Header />
      {children}
    </div>
  );
}
