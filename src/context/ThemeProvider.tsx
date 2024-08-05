import { PropsWithChildren, useEffect, useState } from 'react';
import { ThemeContext, ThemeValue } from './ThemeContext';

const THEME_ITEM = 'theme';

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemeValue>('light');

  useEffect(() => {
    setTheme(localStorage.getItem(THEME_ITEM) === 'dark' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_ITEM, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
