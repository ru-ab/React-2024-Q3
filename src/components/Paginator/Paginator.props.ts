import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type PaginatorProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  page: number | null;
  pageSize: number;
  totalCount: number;
  onPage: (pageNumber: number) => void;
};
