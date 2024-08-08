'use client';
import { useTheme } from '@/hooks';
import styles from './Spinner.module.css';
import { SpinnerProps } from './Spinner.props';

export function Spinner({ ...props }: SpinnerProps) {
  const { theme } = useTheme();

  return (
    <div role="progressbar" className={styles['wrapper']} {...props}>
      <div className={`${styles['spinner']} ${styles[theme]}`} />
    </div>
  );
}
