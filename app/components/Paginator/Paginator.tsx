import { useMemo } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Button } from '~/components';
import styles from './Paginator.module.css';
import { PaginatorProps } from './Paginator.props';

export function Paginator({
  page,
  pageSize,
  totalCount,
  onPage,
  className = '',
  ...props
}: PaginatorProps) {
  const pageNumbers = useMemo(() => {
    const pageCount = Math.ceil(totalCount / pageSize);
    const pages: number[] = [];

    for (let i = 1; i < Math.min(6, pageCount); i += 1) {
      pages.push(i);
    }

    if (page) {
      for (
        let i = Math.max(1, page - 3);
        i < Math.min(page + 3, pageCount);
        i += 1
      ) {
        pages.push(i);
      }
    }

    for (let i = Math.max(1, pageCount - 5); i < pageCount + 1; i += 1) {
      pages.push(i);
    }

    return [...new Set(pages)].sort((a, b) => a - b);
  }, [page, pageSize, totalCount]);

  return (
    <div className={`${styles['paginator']} ${className}`} {...props}>
      {pageNumbers.map((pageNumber, i) => (
        <Fragment key={pageNumber}>
          <Button
            className={styles['button']}
            appearance={pageNumber === page ? 'primary' : 'surface'}
            onClick={() => onPage(pageNumber)}
          >
            {pageNumber}
          </Button>
          {pageNumbers[i + 1] > pageNumbers[i] + 1 && (
            <Button
              className={styles['button']}
              appearance="gray"
              onClick={() =>
                onPage(
                  pageNumbers[i] +
                    Math.round((pageNumbers[i + 1] - pageNumbers[i]) / 2)
                )
              }
            >
              ...
            </Button>
          )}
        </Fragment>
      ))}
    </div>
  );
}
