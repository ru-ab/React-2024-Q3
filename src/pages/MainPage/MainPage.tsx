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
