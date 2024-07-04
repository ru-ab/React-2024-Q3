import { Component } from 'react';
import { Search } from '../../components';

export class Header extends Component {
  render(): JSX.Element {
    return (
      <header>
        <Search />
      </header>
    );
  }
}
