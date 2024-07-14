import { BuggyButton } from '../BuggyButton/BuggyButton';
import { Search } from '../Search/Search';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

export function Header({
  search,
  setSearch,
  className,
  ...props
}: HeaderProps) {
  return (
    <header className={`${styles['header']} ${className}`} {...props}>
      <div className={styles['logo']}>Pokémon TCG</div>
      <Search search={search} setSearch={setSearch} />
      <BuggyButton />
    </header>
  );
}
