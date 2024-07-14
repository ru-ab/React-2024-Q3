import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type ButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { appearance?: 'primary' | 'red' | 'gray' | 'surface'; size?: 'm' | 'l' };
