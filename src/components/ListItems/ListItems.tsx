import { Component } from 'react';
import { ListItemsProps } from './ListItems.props';
import styles from './ListItems.module.css';

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
      <ul className={styles['list']} {...props}>
        {items.map((item) => (
          <li key={item.id} className={styles['list-item']}>
            <img
              src={item.images.small}
              alt={item.name}
              className={styles['image']}
            />
            <div className={styles['name']}>{item.name}</div>
            <div className={styles['description']}>
              {item.flavorText ? item.flavorText : 'No description'}
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
