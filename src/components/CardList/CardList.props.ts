import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CardType } from '../../types';

export type CardListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & { items: CardType[] };
