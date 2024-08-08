'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ThemeContext, ThemeValue } from './ThemeContext';

const THEME_ITEM = 'theme';

export function ThemeProvider({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeValue>('light');

  useEffect(() => {
    setTheme(localStorage.getItem(THEME_ITEM) === 'dark' ? 'dark' : 'light');
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    localStorage.setItem(THEME_ITEM, theme);
  }, [theme, initialized]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
