import { ParsedUrlQuery } from 'querystring';

const defaultPageSize = 20;

export function extractPageParams(query: ParsedUrlQuery) {
  const search = query['search']?.toString() ?? null;

  const page = query['page'] ? Number(query['page']) : null;

  const pageSize = page ? defaultPageSize : null;

  return {
    search,
    page,
    pageSize,
  };
}
