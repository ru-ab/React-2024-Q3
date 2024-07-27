import { useTheme } from '@/hooks';
import styles from './Input.module.css';
import { InputProps } from './Input.props';

export function Input(props: InputProps) {
  const { theme } = useTheme();

  return <input className={`${styles['input']} ${styles[theme]}`} {...props} />;
}
