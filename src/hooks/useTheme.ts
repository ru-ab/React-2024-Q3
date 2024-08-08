'use client';
import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';

export function useTheme() {
  const context = useContext(ThemeContext);

  return context;
}
