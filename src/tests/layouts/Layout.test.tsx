import { render, screen } from '@testing-library/react';
import { Layout } from '../../layouts/Layout';

vi.mock('react-router-dom');

vi.mock('@/components/Header/Header', () => ({
  Header: () => <div>Header</div>,
}));

vi.mock('@/components/CardList/CardList', () => ({
  CardList: () => <div>CardList</div>,
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
});
