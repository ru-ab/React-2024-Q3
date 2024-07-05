import { Component } from 'react';
import { ListItemsProps } from './ListItems.props';

type Props = ListItemsProps;

export class ListItems extends Component<Props> {
  render(): JSX.Element {
    const { loading, items, ...props } = this.props;

    if (loading) {
      return <>Loading...</>;
    }

    if (!items.length) {
      return <>No items</>;
    }

    return (
      <ul {...props}>
        {items.map((item) => (
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
