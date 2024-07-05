import { Component } from 'react';
import { Search, BuggyButton } from '../../components';

export class Header extends Component {
  render(): JSX.Element {
    return (
      <header>
        <Search />
        <BuggyButton />
      </header>
    );
  }
}
