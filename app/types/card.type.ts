import { Ability } from './ability.type';
import { Attack } from './attack.type';
import { Weakness } from './weakness.type';

export type CardType = {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  flavorText?: string;
  artist?: string;
  hp?: string;
  level?: string;
  subtypes?: string[];
  types?: string[];
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: Weakness[];
};
