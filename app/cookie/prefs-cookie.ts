import { createCookie } from '@remix-run/node';
export const prefs = createCookie('prefs');

export type CookieState = {
  theme?: 'light' | 'dark';
};
