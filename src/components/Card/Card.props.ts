import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CardType } from '../../types';

export type CardProps = DetailedHTMLProps<
  HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  item: CardType;
};
