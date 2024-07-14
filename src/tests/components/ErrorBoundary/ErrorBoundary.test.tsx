import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../../../components';

type ErrorComponentProps = {
  error: Error;
};

function ErrorComponent({ error }: ErrorComponentProps): React.JSX.Element {
  throw error;
}

describe('ErrorBoundary', () => {
  it('should render fallback', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    window.addEventListener('error', (event) => {
      event.preventDefault();
    });

    render(
      <ErrorBoundary fallback={<>fallback</>}>
        <ErrorComponent error={new Error('Test Error')} />
      </ErrorBoundary>
    );

    expect(screen.getByText('fallback')).toBeInTheDocument();
  });

  it('should not render fallback', async () => {
    render(
      <ErrorBoundary fallback={<>fallback</>}>
        <p>Normal component</p>
      </ErrorBoundary>
    );

    expect(screen.queryByText('fallback')).not.toBeInTheDocument();
    expect(screen.getByText('Normal component')).toBeInTheDocument();
  });
});
