import { render, screen } from '@testing-library/react';
import { Button } from '../../../components';

describe('Button', () => {
  const renderComponent = () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });

    return {
      button,
    };
  };

  it('should render button', async () => {
    const { button } = renderComponent();

    expect(button).toBeInTheDocument();
  });
});
