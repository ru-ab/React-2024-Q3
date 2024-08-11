import { convertCardsToCsv } from '~/utils';

describe('convertCardsToCsv', () => {
  it('should convert mandatory fields of CardType[] to string', () => {
    const result = convertCardsToCsv([
      {
        id: 'id',
        name: 'name',
        images: {
          small: 'small',
          large: 'large',
        },
      },
    ]);

    expect(result).toMatch(/id/);
    expect(result).toMatch(/name/);
    expect(result).toMatch(/small/);
  });

  it('should convert optional fields of CardType[] to string', () => {
    const result = convertCardsToCsv([
      {
        id: 'id',
        name: 'name',
        flavorText: 'flavorText',
        images: {
          small: 'small',
          large: 'large',
        },
        hp: 'hp',
        level: 'level',
        artist: 'artist',
        types: ['type1', 'type2'],
        subtypes: ['subtype1', 'subtype2'],
        attacks: [
          {
            name: 'attackName',
            cost: ['attackCost'],
            text: 'attackText',
            damage: 'attackDamage',
            convertedEnergyCost: 100,
          },
        ],
        abilities: [
          { name: 'abilityName', text: 'abilityText', type: 'abilityType' },
        ],
        weaknesses: [{ type: 'weaknessType', value: 'weaknessValue' }],
      },
    ]);

    expect(result).toMatch(/flavorText/);
    expect(result).toMatch(/hp/);
    expect(result).toMatch(/level/);
    expect(result).toMatch(/attackName/);
    expect(result).toMatch(/attackCost/);
    expect(result).toMatch(/attackText/);
    expect(result).toMatch(/attackDamage/);
    expect(result).toMatch(/100/);
    expect(result).toMatch(/abilityName/);
    expect(result).toMatch(/abilityText/);
    expect(result).toMatch(/abilityType/);
    expect(result).toMatch(/weaknessType/);
    expect(result).toMatch(/weaknessValue/);
    expect(result).toMatch(/type1/);
    expect(result).toMatch(/type2/);
    expect(result).toMatch(/subtype1/);
    expect(result).toMatch(/subtype2/);
  });
});
