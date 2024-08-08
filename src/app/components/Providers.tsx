'use client';
import { ThemeProvider } from '@/context';
import { PropsWithChildren } from 'react';
import StoreProvider from './StoreProvider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
}
