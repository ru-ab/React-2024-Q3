import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from '~/components';
import styles from './Layout.module.css';

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className={styles['page']}>
      <header className={styles['header']}>
        <Link to="/" className={cn({ [styles['active']]: pathname === '/' })}>
          Home
        </Link>
        <Link
          to="/uncontrolled-components"
          className={cn({
            [styles['active']]: pathname === '/uncontrolled-components',
          })}
        >
          Uncontrolled Components
        </Link>
        <Link
          to="/react-hook-form"
          className={cn({
            [styles['active']]: pathname === '/react-hook-form',
          })}
        >
          React Hook Form
        </Link>
      </header>
      <main className={styles['main']}>
        <Outlet />
      </main>
    </div>
  );
}
