import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CardType } from '~/types';

export type CharacteristicsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  item: CardType;
};
