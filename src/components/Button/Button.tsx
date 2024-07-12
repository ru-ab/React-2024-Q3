import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export function Button({ children, appearance, size, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles['button']} ${styles[appearance]} ${styles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
