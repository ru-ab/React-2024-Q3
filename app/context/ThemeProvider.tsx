import { useLoaderData } from '@remix-run/react';
import { PropsWithChildren, useState } from 'react';
import { loader } from '~/routes/_index';
import { ThemeContext, ThemeValue } from './ThemeContext';

export function ThemeProvider({ children }: PropsWithChildren) {
  const { theme: themeCookie } = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState<ThemeValue>(() =>
    themeCookie === 'dark' ? 'dark' : 'light'
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
