import { Search } from '@/components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

type RenderComponentProps = {
  search: string;
  replace?: () => void;
};

describe('Search', () => {
  const renderComponent = async ({ search, replace }: RenderComponentProps) => {
    const routerModule = await import('next/router');
    routerModule.useRouter = vi.fn().mockReturnValue({
      query: { search },
      replace,
    });

    render(<Search />);

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

  it('should call replace on submit', async () => {
    const search = 'search text';
    const replace = vi.fn();

    const { input, button } = await renderComponent({ search: '', replace });

    const user = userEvent.setup();
    await user.type(input, search);
    await user.click(button);

    expect(input.value).toBe(search);
    expect(replace).toHaveBeenCalledWith({
      query: {
        search,
      },
    });
  });
});
