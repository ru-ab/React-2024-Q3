import { render, screen } from '@testing-library/react';
import { Paginator } from '~/components';
import { PaginatorProps } from '~/components/Paginator/Paginator.props';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom');

describe('Paginator', () => {
  const renderComponent = async (props: PaginatorProps) => {
    const setSearchParamsMock = vi.fn();
    const routerModule = await import('react-router-dom');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([{}, setSearchParamsMock]);
    render(<Paginator {...props} />);

    return {
      setSearchParamsMock,
    };
  };

  it('should render the Paginator', async () => {
    await renderComponent({
      page: 1,
      pageSize: 2,
      totalCount: 3,
      onPage: () => {},
    });

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
  });

  it('should render button with dots', async () => {
    await renderComponent({
      page: 1,
      pageSize: 2,
      totalCount: 1000,
      onPage: () => {},
    });

    const button = screen.getByText('...');
    expect(button).toBeInTheDocument();
  });

  it('should call onPage upon button click', async () => {
    const onPageMock = vi.fn();

    await renderComponent({
      page: 1,
      pageSize: 2,
      totalCount: 1000,
      onPage: onPageMock,
    });

    const button = screen.getByRole('button', { name: /3/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(onPageMock).toHaveBeenCalledWith(3);
  });
});
