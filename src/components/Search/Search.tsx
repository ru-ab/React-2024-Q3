'use client';
import { Button, Input } from '@/components';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import styles from './Search.module.css';

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.get('search')?.toString().trim() ?? '';

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputValue = formData.get('search') ?? '';

    if (search !== inputValue) {
      if (!inputValue.toString().trim()) {
        router.push('/');
      } else {
        router.push(`${pathname}?search=${inputValue.toString().trim()}`);
      }
    }
  };

  return (
    <form className={styles['form']} onSubmit={onSubmit}>
      <Input name="search" type="search" defaultValue={search} />
      <Button>Search</Button>
    </form>
  );
}
