import { ChangeEvent, Component, MouseEvent } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { SearchProps } from './Search.props';
import { SearchState } from './Search.state';
import styles from './Search.module.css';

type Props = SearchProps;
type State = SearchState;

export class Search extends Component<Props, State> {
  state: State = {
    search: '',
  };

  componentDidMount(): void {
    this.setState({ search: this.props.search });
  }

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: event.target.value });
  };

  render(): JSX.Element {
    const { setSearch, ...props } = this.props;

    const onClick = (event: MouseEvent): void => {
      event.preventDefault();
      setSearch(this.state.search);
    };

    return (
      <form className={styles['form']} {...props}>
        <Input
          value={this.state.search}
          onChange={this.onChange}
          type="search"
        />
        <Button appearance="primary" onClick={onClick}>
          Search
        </Button>
      </form>
    );
  }
}
