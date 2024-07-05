import { ChangeEvent, Component, ContextType, MouseEvent } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { SearchProps } from './Search.props';
import { SearchState } from './Search.state';
import { ItemsContext } from '../../contexts';

type Props = Readonly<SearchProps>;
type State = Readonly<SearchState>;

export class Search extends Component<Props, State> {
  static contextType = ItemsContext;
  declare context: ContextType<typeof ItemsContext>;

  readonly state: State = {
    search: '',
  };

  componentDidMount(): void {
    this.setState({ search: this.context.search });
  }

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: event.target.value });
  };

  onClick = (event: MouseEvent): void => {
    event.preventDefault();
    this.context.setSearch(this.state.search);
  };

  render(): JSX.Element {
    return (
      <form {...this.props}>
        <Input value={this.state.search} onChange={this.onChange} />
        <Button onClick={this.onClick}>Search</Button>
      </form>
    );
  }
}
