import { useFetcher, useSubmit } from '@remix-run/react';
import { useTheme } from '~/hooks';
import styles from './ThemeSwitch.module.css';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const fetcher = useFetcher();
  const submit = useSubmit();

  return (
    <fetcher.Form
      method="post"
      onChange={(event) => {
        submit(event.currentTarget);
        setTheme(
          new FormData(event.currentTarget).get('theme') === 'on'
            ? 'light'
            : 'dark'
        );
      }}
    >
      <label className={styles['switch']}>
        <input
          tabIndex={-1}
          type="checkbox"
          defaultChecked={theme !== 'dark'}
          name="theme"
        />
        <span className={styles['slider']} />
      </label>
    </fetcher.Form>
  );
}
