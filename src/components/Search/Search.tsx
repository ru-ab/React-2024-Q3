import { ChangeEvent, Component, ContextType, MouseEvent } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { SearchProps } from './Search.props';
import { SEARCH } from './Search.const';
import { SearchContext } from '../../contexts';

export class Search extends Component<SearchProps> {
  static contextType = SearchContext;
  declare context: ContextType<typeof SearchContext>;

  componentDidMount(): void {
    const search = localStorage.getItem(SEARCH);
    if (!search) {
      return;
    }

    this.context.setSearch(search);
  }

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.context.setSearch(event.target.value);
  };

  onClick = (event: MouseEvent): void => {
    event.preventDefault();
    localStorage.setItem(SEARCH, this.context.search);
  };

  render(): JSX.Element {
    return (
      <form {...this.props}>
        <Input value={this.context.search} onChange={this.onChange} />
        <Button onClick={this.onClick}>Search</Button>
      </form>
    );
  }
}
