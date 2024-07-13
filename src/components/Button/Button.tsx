import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export function Button({
  children,
  className = '',
  appearance = 'primary',
  size = 'm',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles['button']} ${styles[appearance]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
