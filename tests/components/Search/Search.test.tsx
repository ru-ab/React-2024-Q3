import { render, screen } from '@testing-library/react';
import { Search } from '~/components';
import { createRemixStub } from '@remix-run/testing';

vi.mock('@remix-run/react', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@remix-run/react')>()),
    useSearchParams: vi.fn(),
  };
});

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: Search,
  },
]);

type RenderComponentProps = {
  search: string;
};

describe('Search', () => {
  const renderComponent = async ({ search }: RenderComponentProps) => {
    const searchParamsMock = { get: vi.fn().mockReturnValue(search) };
    const setSearchParamsMock = vi.fn();

    const routerModule = await import('@remix-run/react');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([searchParamsMock, setSearchParamsMock]);

    render(<RemixStub />);

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    const button = screen.getByRole('button');

    return {
      input,
      button,
    };
  };

  it('should render search text', async () => {
    const search = 'search text';

    const { input } = await renderComponent({ search });

    expect(input.value).toBe(search);
  });
});
