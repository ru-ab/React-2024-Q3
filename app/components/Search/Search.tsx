import { Form, useSearchParams } from '@remix-run/react';
import { Button, Input } from '~/components';
import styles from './Search.module.css';

export function Search() {
  const [searchParams] = useSearchParams();

  return (
    <Form method="get" className={styles['form']}>
      <Input
        name="search"
        type="search"
        defaultValue={searchParams.get('search') ?? ''}
      />
      <Button>Search</Button>
    </Form>
  );
}
