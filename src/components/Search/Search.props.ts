import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SearchProps = DetailedHTMLProps<
  HTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & { search: string; setSearch: (search: string) => void };
