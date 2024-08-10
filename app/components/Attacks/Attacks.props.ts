import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Attack } from '~/types';

export type AttacksProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  attacks: Attack[];
};
