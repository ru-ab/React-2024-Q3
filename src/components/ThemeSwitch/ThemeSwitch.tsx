import { useTheme } from '@/hooks';
import styles from './ThemeSwitch.module.css';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const onChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <label className={styles['switch']}>
      <input
        tabIndex={-1}
        type="checkbox"
        checked={theme === 'light'}
        onChange={onChange}
      />
      <span className={styles['slider']} />
    </label>
  );
}
