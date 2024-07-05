import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Card } from '../../types';

export type ListItemsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & { items: Card[]; loading: boolean };
