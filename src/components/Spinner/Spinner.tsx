import styles from './Spinner.module.css';
import { SpinnerProps } from './Spinner.props';

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      className={`${styles['spinner']} ${className ?? ''}`}
      role="progressbar"
      {...props}
    />
  );
}
