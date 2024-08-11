import { useTheme } from '~/hooks';
import styles from './Checkbox.module.css';
import { CheckboxProps } from './Checkbox.props';

export function Checkbox(props: CheckboxProps) {
  const { theme } = useTheme();

  return (
    <input
      className={`${styles['checkbox']} ${styles[theme]}`}
      type="checkbox"
      {...props}
    />
  );
}
