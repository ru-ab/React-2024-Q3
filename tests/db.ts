import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  card: {
    id: primaryKey(String),
    name: String,
    images: {
      small: String,
      large: String,
    },
    flavorText: String,
    artist: String,
    hp: String,
    level: String,
    subtypes: Array,
    types: Array,
    abilities: Array,
    attacks: Array,
    weaknesses: Array,
  },
});
