import { render, screen } from '@testing-library/react';
import { BuggyButton } from '@/components';

describe('BuggyButton', () => {
  const renderComponent = () => {
    const { container } = render(<BuggyButton />);

    const button = screen.getByRole('button', { name: /throw/i });

    return {
      container,
      button,
    };
  };

  it('should render button', async () => {
    const { button } = renderComponent();

    expect(button).toBeInTheDocument();
  });
});
