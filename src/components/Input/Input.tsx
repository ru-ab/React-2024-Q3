import { InputProps } from './Input.props';
import styles from './Input.module.css';

export function Input(props: InputProps) {
  return <input className={styles['input']} {...props} />;
}
