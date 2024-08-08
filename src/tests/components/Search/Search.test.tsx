import { Search } from '@/components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
  usePathname: vi.fn().mockReturnValue('pathname'),
  useSearchParams: vi.fn().mockReturnValue({
    toString: vi.fn(),
  }),
}));

type RenderComponentProps = {
  searchParams?: URLSearchParams;
};

describe('Search', () => {
  const renderComponent = async ({
    searchParams = new URLSearchParams(),
  }: RenderComponentProps) => {
    const pushMock = vi.fn();

    const navigationModule = await import('next/navigation');
    navigationModule.useRouter = vi.fn().mockReturnValue({ push: pushMock });
    navigationModule.useSearchParams = vi.fn().mockReturnValue(searchParams);

    render(<Search />);

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    const button = screen.getByRole('button');

    return {
      input,
      button,
      pushMock,
    };
  };

  it('should render search text', async () => {
    const search = 'search text';

    const { input } = await renderComponent({
      searchParams: new URLSearchParams({ search }),
    });

    expect(input.value).toBe(search);
  });

  it('should call push on submit', async () => {
    const search = 'search text';

    const { input, button, pushMock } = await renderComponent({});

    const user = userEvent.setup();
    await user.type(input, search);
    await user.click(button);

    expect(input.value).toBe(search);
    expect(pushMock).toHaveBeenCalledWith(
      'pathname?search=search+text',
      undefined
    );
  });
});
