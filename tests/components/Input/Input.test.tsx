import { render, screen } from '@testing-library/react';
import { Input } from '~/components';

describe('Input', () => {
  const renderComponent = () => {
    render(<Input placeholder="placeholder" />);

    const input = screen.getByPlaceholderText('placeholder');

    return {
      input,
    };
  };

  it('should render input', async () => {
    const { input } = renderComponent();

    expect(input).toBeInTheDocument();
  });
});
