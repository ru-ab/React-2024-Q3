import { FormEvent } from 'react';
import { Input, Button } from '@/components';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';

export function Search({ search, setSearch, ...props }: SearchProps) {
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputValue = formData.get('search') ?? '';

    if (search !== inputValue) {
      setSearch(inputValue.toString());
    }
  };

  return (
    <form className={styles['form']} onSubmit={onSubmit} {...props}>
      <Input name="search" type="search" defaultValue={search} />
      <Button>Search</Button>
    </form>
  );
}
