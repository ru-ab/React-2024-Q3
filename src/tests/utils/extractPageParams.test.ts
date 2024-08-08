import { extractPageParams } from '@/utils';

describe('extractPageParams', () => {
  it('should return null if no params', () => {
    const result = extractPageParams({});

    expect(result).toMatchObject({
      search: null,
      page: null,
      pageSize: null,
    });
  });

  it('should return params', () => {
    const result = extractPageParams({
      search: 'search',
      page: ' 1',
    });

    expect(result).toMatchObject({
      search: 'search',
      page: 1,
      pageSize: 20,
    });
  });
});
