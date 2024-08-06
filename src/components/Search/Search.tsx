import { Button, Input } from '@/components';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import styles from './Search.module.css';

export function Search() {
  const router = useRouter();
  const search = router.query['search']?.toString().trim() ?? '';

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputValue = formData.get('search') ?? '';

    if (search !== inputValue) {
      router.replace({
        query: {
          ...(inputValue.toString().trim()
            ? { search: inputValue.toString().trim() }
            : {}),
        },
      });
    }
  };

  return (
    <form className={styles['form']} onSubmit={onSubmit}>
      <Input name="search" type="search" defaultValue={search} />
      <Button>Search</Button>
    </form>
  );
}
