import { ErrorMessageProps } from './ErrorMessage.props';
import styles from './ErrorMessage.module.css';

export function ErrorMessage({ children }: ErrorMessageProps) {
  return <span className={styles['error-message']}>{children}</span>;
}
