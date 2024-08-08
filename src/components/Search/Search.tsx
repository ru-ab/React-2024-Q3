'use client';
import { Button, Input } from '@/components';
import { useSearchParamsBuilder } from '@/hooks';
import { FormEvent } from 'react';
import styles from './Search.module.css';

export function Search() {
  const params = useSearchParamsBuilder();
  const search = params?.get('search')?.toString().trim() ?? '';

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputValue = formData.get('search') ?? '';

    if (search !== inputValue) {
      params.deleteAll();
      if (inputValue.toString().trim()) {
        params.set('search', inputValue.toString().trim());
      }
      params.apply();
    }
  };

  return (
    <form className={styles['form']} onSubmit={onSubmit}>
      <Input name="search" type="search" defaultValue={search} />
      <Button>Search</Button>
    </form>
  );
}
