import { useTheme } from '@/hooks';
import styles from './Spinner.module.css';
import { SpinnerProps } from './Spinner.props';

export function Spinner({ className = '', ...props }: SpinnerProps) {
  const { theme } = useTheme();

  return (
    <div role="progressbar" className={className} {...props}>
      <div className={`${styles['spinner']} ${styles[theme]}`} />
    </div>
  );
}
