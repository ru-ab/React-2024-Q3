import { BuggyButton, Search, ThemeSwitch } from '@/components';
import { useTheme } from '@/hooks';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

export function Header({ search, setSearch }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <header className={`${styles['header']} ${styles[theme]}`}>
      <div className={`${styles['logo']} ${styles[theme]}`}>Pokémon TCG</div>
      <Search search={search} setSearch={setSearch} />
      <div className={styles['actions']}>
        <ThemeSwitch />
        <BuggyButton />
      </div>
    </header>
  );
}
