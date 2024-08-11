import { render, screen } from '@testing-library/react';
import { BuggyButton } from '~/components';

describe('BuggyButton', () => {
  const renderComponent = () => {
    render(<BuggyButton />);

    const button = screen.getByRole('button', { name: /throw/i });

    return {
      button,
    };
  };

  it('should render the button', async () => {
    const { button } = renderComponent();

    expect(button).toBeInTheDocument();
  });
});
