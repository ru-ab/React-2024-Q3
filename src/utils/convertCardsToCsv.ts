import { Ability, Attack, CardType, Weakness } from '@/types';

function convertAttacks(attacks?: Attack[]): string {
  if (!attacks) {
    return '';
  }

  return attacks
    .map(
      ({ name, text, damage, cost, convertedEnergyCost }) =>
        `${name} ${text} ${damage} ${cost} ${convertedEnergyCost}`
    )
    .join('|');
}

function convertAbilities(abilities?: Ability[]): string {
  if (!abilities) {
    return '';
  }

  return abilities
    .map(({ name, text, type }) => `${name} ${text} ${type}`)
    .join('|');
}

function convertWeaknesses(weaknesses?: Weakness[]): string {
  if (!weaknesses) {
    return '';
  }

  return weaknesses.map(({ type, value }) => `${type} ${value}`).join('|');
}

function convertStringArray(array?: string[]) {
  if (!array) {
    return '';
  }

  return array.join('|');
}

function createHeader() {
  const columns: string[] = [
    'Id',
    'Name',
    'Description',
    'Small Image',
    'Large Image',
    'HP',
    'Level',
    'Artist',
    'Types',
    'Subtypes',
    'Abilities',
    'Weakness',
    'Attacks',
  ];

  return `${columns.join(';')}\n`;
}

export function convertCardsToCsv(cards: CardType[]) {
  let csv = createHeader();

  cards.forEach((card) => {
    const line: string[] = [
      card.id,
      card.name,
      card.flavorText ?? '',
      card.images.small,
      card.images.large,
      card.hp ?? '',
      card.level ?? '',
      card.artist ?? '',
      convertStringArray(card.types),
      convertStringArray(card.subtypes),
      convertAbilities(card.abilities),
      convertWeaknesses(card.weaknesses),
      convertAttacks(card.attacks),
    ];

    csv += `${line.join(';')}\n`;
  });

  return csv;
}
