import { render, screen } from '@testing-library/react';
import { Characteristics } from '~/components';
import { CharacteristicsProps } from '~/components/Characteristics/Characteristics.props';
import { CardType } from '~/types';

describe('Characteristics', () => {
  const renderComponent = (props: CharacteristicsProps) => {
    render(<Characteristics {...props} />);
  };

  it('should render characteristics', async () => {
    const card: CardType = {
      level: 'level',
      types: ['type1'],
      subtypes: ['subtype1'],
      weaknesses: [{ type: 'type', value: 'weakness1' }],
    } as CardType;

    renderComponent({ item: card });

    const level = screen.getByText(card.level!);
    const type = screen.getByText(card.types![0]);
    const subtype = screen.getByText(card.subtypes![0]);
    const weakness = screen.getByText(
      card.weaknesses![0].type + ' ' + card.weaknesses![0].value
    );

    expect(level).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(subtype).toBeInTheDocument();
    expect(weakness).toBeInTheDocument();
  });
});
