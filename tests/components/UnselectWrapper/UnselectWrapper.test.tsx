import { render, screen } from '@testing-library/react';
import { UnselectWrapper } from '~/components';

vi.mock('@remix-run/react');

describe('UnselectWrapper', () => {
  it('should render children', async () => {
    const routerModule = await import('@remix-run/react');
    routerModule.useSearchParams = vi.fn().mockReturnValue([{}, vi.fn()]);

    render(<UnselectWrapper>Children</UnselectWrapper>);

    const children = screen.getByText('Children');

    expect(children).toBeInTheDocument();
  });
});
