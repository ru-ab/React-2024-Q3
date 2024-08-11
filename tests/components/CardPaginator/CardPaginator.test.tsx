import { render } from '@testing-library/react';
import { CardPaginator } from '~/components';

vi.mock('@remix-run/react');

describe('CardPaginator', () => {
  const renderComponent = async () => {
    const searchParamsMock = { get: vi.fn() };
    const setSearchParamsMock = vi.fn();

    const routerModule = await import('@remix-run/react');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([searchParamsMock, setSearchParamsMock]);

    render(<CardPaginator page={'1'} totalCount={10} />);
  };

  it('should render the paginator', async () => {
    await renderComponent();
  });
});
