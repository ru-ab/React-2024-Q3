import { BuggyButton, Search, ThemeSwitch } from '@/components';
import { useTheme } from '@/hooks';
import styles from './Header.module.css';

export function Header() {
  const { theme } = useTheme();

  return (
    <header className={`${styles['header']} ${styles[theme]}`}>
      <div className={`${styles['logo']} ${styles[theme]}`}>Pokémon TCG</div>
      <Search />
      <div className={styles['actions']}>
        <ThemeSwitch />
        <BuggyButton />
      </div>
    </header>
  );
}
