import { render, screen } from '@testing-library/react';
import { NotFound } from '../../../components';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom');

describe('NotFound', () => {
  const renderComponent = async () => {
    const navigateMock = vi.fn();

    const routerModule = await import('react-router-dom');
    routerModule.useNavigate = vi.fn().mockReturnValue(navigateMock);

    render(<NotFound />);

    const message = screen.getByText(/page not exists/i);
    const button = screen.getByRole('button', { name: /to home/i });

    return {
      message,
      button,
      navigateMock,
    };
  };

  it('should render not found page', async () => {
    const { message, button } = await renderComponent();

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should navigate to home upon button clicking', async () => {
    const { navigateMock, button } = await renderComponent();

    const user = userEvent.setup();
    await user.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
