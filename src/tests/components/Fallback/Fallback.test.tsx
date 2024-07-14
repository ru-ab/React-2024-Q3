import { render, screen } from '@testing-library/react';
import { Fallback } from '../../../components';
import userEvent from '@testing-library/user-event';

describe('Fallback', () => {
  const renderComponent = () => {
    render(<Fallback />);

    const message = screen.getByText(/wrong/i);
    const button = screen.getByRole('button', { name: /refresh/i });

    return {
      message,
      button,
    };
  };

  it('should render fallback ui', async () => {
    const { message, button } = renderComponent();

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should reload window upon button clicking', async () => {
    const reload = vi.fn();
    const location: Partial<typeof window.location> = {
      reload,
    };
    window.location = location as typeof window.location;

    const { button } = renderComponent();

    const user = userEvent.setup();
    await user.click(button);

    expect(reload).toHaveBeenCalled();
  });
});
