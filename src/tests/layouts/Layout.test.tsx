import { render, screen } from '@testing-library/react';
import { Layout } from '../../layouts/Layout';
import userEvent from '@testing-library/user-event';

vi.mock('react-router-dom');

vi.mock('../../components/Header/Header', () => ({
  Header: () => <div>Header</div>,
}));

type RenderComponent = {
  detailsParamExists: boolean;
};

describe('Layout', () => {
  const renderComponent = async ({ detailsParamExists }: RenderComponent) => {
    const getSearchParamsMock = vi.fn().mockReturnValue(detailsParamExists);
    const setSearchParamsMock = vi.fn();
    const routerModule = await import('react-router-dom');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([{ get: getSearchParamsMock }, setSearchParamsMock]);

    render(<Layout />);

    return {
      setSearchParamsMock,
    };
  };

  it('should render Layout', async () => {
    await renderComponent({ detailsParamExists: false });

    const header = screen.getByText('Header');

    expect(header).toBeInTheDocument();
  });

  it('should not clean details if detail page not opened', async () => {
    await renderComponent({ detailsParamExists: false });

    const header = screen.getByText('Header');

    const user = userEvent.setup();
    await user.click(header);

    expect(header).toBeInTheDocument();
  });

  it('should not clean details', async () => {
    await renderComponent({ detailsParamExists: true });

    const header = screen.getByText('Header');

    const user = userEvent.setup();
    await user.click(header);

    expect(header).toBeInTheDocument();
  });
});
