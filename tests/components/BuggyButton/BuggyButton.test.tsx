import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BuggyButton, ErrorBoundary } from '../../../components';

describe('BuggyButton', () => {
  const renderComponent = () => {
    render(
      <ErrorBoundary fallback={<>fallback</>}>
        <BuggyButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw/i });

    return {
      button,
    };
  };

  it('should render button', async () => {
    const { button } = renderComponent();

    expect(button).toBeInTheDocument();
  });

  it('should throw an error upon clicking and show fallback', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    window.addEventListener('error', (event) => {
      event.preventDefault();
    });

    const { button } = renderComponent();

    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText('fallback')).toBeInTheDocument();
  });
});
