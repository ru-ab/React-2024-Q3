import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type ButtonProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { appearance?: 'primary' | 'red'; size?: 'm' | 'l' };
