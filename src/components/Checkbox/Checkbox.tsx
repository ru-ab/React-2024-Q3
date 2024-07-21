import styles from './Checkbox.module.css';
import { CheckboxProps } from './Checkbox.props';

export function Checkbox(props: CheckboxProps) {
  return <input className={styles['checkbox']} type="checkbox" {...props} />;
}
