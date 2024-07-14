import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  search: string;
  setSearch: (search: string) => void;
};
