import { Component, PropsWithChildren } from 'react';
import { SearchContext } from './SearchContext';

type SearchContextProviderState = { search: string };

export class SearchContextProvider extends Component<
  PropsWithChildren,
  SearchContextProviderState
> {
  state = {
    search: '',
  };

  setSearch = (search: string): void => {
    this.setState({ search });
  };

  render(): JSX.Element {
    return (
      <SearchContext.Provider
        value={{ search: this.state.search, setSearch: this.setSearch }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}
