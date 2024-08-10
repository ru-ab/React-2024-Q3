import { useContext } from 'react';
import { ThemeContext } from '~/context';

export function useTheme() {
  const context = useContext(ThemeContext);

  return context;
}
