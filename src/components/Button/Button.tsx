import { useTheme } from '@/hooks';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';

export function Button({
  children,
  className = '',
  appearance = 'primary',
  size = 'm',
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      className={`${styles['button']} ${styles[theme]} ${styles[appearance]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
