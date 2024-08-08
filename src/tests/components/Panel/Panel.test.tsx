import { Panel } from '@/components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
  usePathname: vi.fn(),
  useSearchParams: vi.fn().mockReturnValue({
    toString: vi.fn(),
  }),
}));

type RenderComponentProps = {
  searchParams?: URLSearchParams;
};

describe('Panel', () => {
  const renderComponent = async ({
    searchParams = new URLSearchParams(),
  }: RenderComponentProps) => {
    const pushMock = vi.fn();

    const navigationModule = await import('next/navigation');
    navigationModule.useRouter = vi.fn().mockReturnValue({
      push: pushMock,
    });
    navigationModule.useSearchParams = vi.fn().mockReturnValue(searchParams);

    render(<Panel />);

    return { pushMock };
  };

  it('should render the panel', async () => {
    await renderComponent({});

    const button = screen.getByRole('button', { name: /x/i });

    expect(button).toBeInTheDocument();
  });

  it('should remove search param upon clicking close panel button', async () => {
    const { pushMock } = await renderComponent({
      searchParams: new URLSearchParams({ details: 'cardId' }),
    });

    const button = screen.getByRole('button', { name: /x/i });
    const user = userEvent.setup();
    await user.click(button);

    expect(pushMock).toHaveBeenCalled();
  });
});
