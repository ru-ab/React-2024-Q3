import { render, screen } from '@testing-library/react';
import { CardList } from '../../../components';
import { CardListProps } from '../../../components/CardList/CardList.props';
import { CardType } from '../../../types';

vi.mock('../../../components/Card/Card', () => ({ Card: () => <li>Card</li> }));

describe('CardList', () => {
  const renderComponent = (props: CardListProps) => {
    render(<CardList {...props} />);

    const list = screen.queryByRole('list');
    const listItems = screen.queryAllByRole('listitem');

    return {
      list,
      listItems,
    };
  };

  it('should show "no items"', async () => {
    const { list } = renderComponent({ items: [] });

    expect(list).not.toBeInTheDocument();
    expect(screen.getByText(/no items/i)).toBeInTheDocument();
  });

  it('should render items', async () => {
    const items: CardType[] = [
      { id: 'card1' },
      { id: 'card2' },
    ] as unknown as CardType[];

    const { list, listItems } = renderComponent({
      items,
    });

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
  });
});
