import { render, screen } from '@testing-library/react';
import { NotFound } from '@/components';
import userEvent from '@testing-library/user-event';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

type RenderComponentProps = {
  push?: () => void;
};

describe('NotFound', () => {
  const renderComponent = async ({ push }: RenderComponentProps) => {
    const routerModule = await import('next/router');
    routerModule.useRouter = vi.fn().mockReturnValue({
      push,
    });

    render(<NotFound />);

    const message = screen.getByText(/page not exists/i);
    const button = screen.getByRole('button', { name: /to home/i });

    return {
      message,
      button,
    };
  };

  it('should render not found page', async () => {
    const { message, button } = await renderComponent({});

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should navigate to home upon button clicking', async () => {
    const push = vi.fn();
    const { button } = await renderComponent({ push });

    const user = userEvent.setup();
    await user.click(button);

    expect(push).toHaveBeenCalledWith('/');
  });
});
