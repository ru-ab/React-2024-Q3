import { Component } from 'react';
import styles from './MainPage.module.css';
import { BuggyButton, ListItems, Search } from '../../components';
import { MainPageProps } from './MainPage.props';
import { SEARCH } from './MainPage.const';
import { MainPageState } from './MainPage.state';
import { GetItemsRequest, getItems } from '../../api';

type Props = MainPageProps;
type State = MainPageState;

export class MainPage extends Component<Props, State> {
  private abortController: AbortController = new AbortController();

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

  componentWillUnmount(): void {
    this.abortController.abort();
  }

  requestItems = async (): Promise<void> => {
    try {
      this.abortController.abort();

      this.setState({ loading: true });
      this.abortController = new AbortController();

      let request: GetItemsRequest = {
        signal: this.abortController.signal,
      };
      if (this.state.search) {
        request = {
          ...request,
          search: this.state.search,
          pageSize: 20,
        };
      }

      const { data: items } = await getItems(request);
      this.setState({ items, loading: false });
    } catch (error) {
      if (error instanceof DOMException) {
        return;
      }

      this.setState({ items: [], loading: false });
    }
  };

  setSearch = (search: string): void => {
    this.setState({ search: search.trim() });
    localStorage.setItem(SEARCH, search.trim());
  };

  render(): JSX.Element {
    return (
      <div className={styles['page']} {...this.props}>
        <header className={styles['header']}>
          <div className={styles['logo']}>Pokémon TCG</div>
          <Search search={this.state.search} setSearch={this.setSearch} />
          <BuggyButton />
        </header>
        <main className={styles['main']}>
          <ListItems items={this.state.items} loading={this.state.loading} />
        </main>
      </div>
    );
  }
}
