import { Main } from '@/components';
import { render, screen } from '@testing-library/react';

describe('Main', () => {
  it('should render child component', () => {
    render(<Main>MainChild</Main>);

    const childComponent = screen.getByText('MainChild');

    expect(childComponent).toBeInTheDocument();
  });
});
