import { render, screen } from '@testing-library/react';
import { CardList } from '../../../components';
import { CardListProps } from '../../../components/CardList/CardList.props';
import { CardType } from '../../../types';

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
      {
        id: '1',
        name: 'card1',
        flavorText: 'flavorText1',
        images: { small: 'small1', large: 'large1' },
      },
      {
        id: '2',
        name: 'card2',
        flavorText: 'flavorText2',
        images: { small: 'small2', large: 'large2' },
      },
    ];

    const { list, listItems } = renderComponent({
      items,
    });

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
    listItems.forEach((listItem, i) => {
      expect(listItem).toHaveTextContent(items[i].name);
      expect(listItem).toHaveTextContent(items[i].flavorText!);
    });
  });

  it('should render item without description', async () => {
    const items: CardType[] = [
      {
        id: '1',
        name: 'card1',
        images: { small: 'small1', large: 'large1' },
      },
    ];

    const { list, listItems } = renderComponent({
      items,
    });

    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(1);

    expect(listItems[0]).toHaveTextContent(items[0].name);
    expect(listItems[0]).toHaveTextContent(/no description/i);
  });
});
