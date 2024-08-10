import { render, screen } from '@testing-library/react';
import { Attacks } from '../../../components/Attacks/Attacks';
import { AttacksProps } from '../../../components/Attacks/Attacks.props';
import { Attack } from '../../../../app/types';

describe('Attacks', () => {
  const renderComponent = (props: AttacksProps) => {
    render(<Attacks {...props} />);
  };

  it('should render attacks', async () => {
    const attack: Attack = {
      name: 'Attack1',
      damage: '20+',
      convertedEnergyCost: 10,
      cost: ['fire'],
      text: 'Description',
    };

    renderComponent({
      attacks: [attack],
    });

    const name = screen.getByText(attack.name);
    const damage = screen.getByText(`Damage: ${attack.damage}`);
    const cost = screen.getByText(attack.cost[0]);
    const text = screen.getByText(attack.text);

    expect(name).toBeInTheDocument();
    expect(damage).toBeInTheDocument();
    expect(cost).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
