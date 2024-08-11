import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type BadgesProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  values: string[];
};
