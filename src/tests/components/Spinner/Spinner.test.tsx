import { render, screen } from '@testing-library/react';
import { Spinner } from '../../../components';

describe('Spinner', () => {
  const renderComponent = () => {
    render(<Spinner />);

    const spinner = screen.getByRole('progressbar');

    return {
      spinner,
    };
  };

  it('should render spinner', async () => {
    const { spinner } = renderComponent();

    expect(spinner).toBeInTheDocument();
  });
});
