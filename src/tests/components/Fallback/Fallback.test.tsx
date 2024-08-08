import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Fallback } from '@/components';

describe('Fallback', () => {
  const renderComponent = () => {
    const resetMock = vi.fn();

    render(<Fallback reset={resetMock} />);

    const message = screen.getByText(/wrong/i);
    const button = screen.getByRole('button', { name: /refresh/i });

    return {
      message,
      button,
      resetMock,
    };
  };

  it('should render fallback ui', async () => {
    const { message, button } = renderComponent();

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should call reset() upon button clicking', async () => {
    const { button, resetMock } = renderComponent();

    const user = userEvent.setup();
    await user.click(button);

    expect(resetMock).toHaveBeenCalled();
  });
});
