import { Component, PropsWithChildren } from 'react';
import { ItemsContext, ItemsContextState } from './ItemsContext';
import { GetItemsRequest, getItems } from '../../api';
import { SEARCH } from './ItemsContext.const';

type ItemsContextProviderState = Pick<
  ItemsContextState,
  'search' | 'items' | 'loading'
>;

type Props = Readonly<PropsWithChildren>;
type State = Readonly<ItemsContextProviderState>;

export class ItemsContextProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const search = localStorage.getItem(SEARCH);
    this.state = { search: search ?? '', items: [], loading: false };
  }

  async componentDidMount(): Promise<void> {
    this.requestItems();
  }

  async componentDidUpdate(_: Props, prevState: State): Promise<void> {
    if (prevState.search === this.state.search) {
      return;
    }

    this.requestItems();
  }

  requestItems = async (): Promise<void> => {
    try {
      this.setState({ loading: true });

      let request: GetItemsRequest = {};
      if (this.state.search) {
        request = {
          search: this.state.search,
          pageSize: 20,
        };
      }

      const { data: items } = await getItems(request);
      this.setState({ items, loading: false });
    } catch {
      this.setState({ items: [], loading: false });
    }
  };

  setSearch = (search: string): void => {
    this.setState({ search: search.trim() });
    localStorage.setItem(SEARCH, search.trim());
  };

  render(): JSX.Element {
    return (
      <ItemsContext.Provider
        value={{
          ...this.state,
          setSearch: this.setSearch,
        }}
      >
        {this.props.children}
      </ItemsContext.Provider>
    );
  }
}
