import { Component, ContextType } from 'react';
import { ListItemsProps } from './ListItems.props';
import { ItemsContext } from '../../contexts';

type Props = Readonly<ListItemsProps>;

export class ListItems extends Component<Props> {
  static contextType = ItemsContext;
  declare context: ContextType<typeof ItemsContext>;

  render(): JSX.Element {
    if (this.context.loading) {
      return <>Loading...</>;
    }

    if (!this.context.items.length) {
      return <>No items</>;
    }

    return (
      <ul {...this.props}>
        {this.context.items.map((item) => (
          <li key={item.id}>
            <img src={item.images.small} alt={item.name} />
            <div>{item.name}</div>
            {item.flavorText && <div>{item.flavorText}</div>}
          </li>
        ))}
      </ul>
    );
  }
}
