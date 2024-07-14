import { ChangeEvent, MouseEvent, useState } from 'react';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';

export function Search({ search, setSearch, ...props }: SearchProps) {
  const [searchText, setSearchText] = useState<string>(search);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  const onClick = (event: MouseEvent): void => {
    event.preventDefault();
    setSearch(searchText);
  };

  return (
    <form className={styles['form']} {...props}>
      <Input value={searchText} onChange={onChange} type="search" />
      <Button onClick={onClick}>Search</Button>
    </form>
  );
}
