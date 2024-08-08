'use client';
import { createContext } from 'react';

export type ThemeValue = 'light' | 'dark';

type ContextType = {
  theme: ThemeValue;
  setTheme: (theme: ThemeValue) => void;
};

const defaultValue: ContextType = { theme: 'light', setTheme: () => {} };

export const ThemeContext = createContext(defaultValue);
