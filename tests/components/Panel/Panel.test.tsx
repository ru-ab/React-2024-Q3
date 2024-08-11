import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Panel } from '~/components';
import { store } from '~/store/store';

vi.mock('@remix-run/react');

describe('Panel', () => {
  const renderComponent = async () => {
    const searchParamsMock = { get: vi.fn().mockReturnValue('cardId') };
    const setSearchParamsMock = vi.fn();

    const routerModule = await import('@remix-run/react');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([searchParamsMock, setSearchParamsMock]);

    render(
      <Provider store={store}>
        <Panel>Children</Panel>
      </Provider>
    );

    return {
      setSearchParamsMock,
    };
  };

  it('should render the panel', async () => {
    await renderComponent();

    const button = screen.getByRole('button', { name: /x/i });
    const children = screen.getByText('Children');

    expect(button).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  it('should remove search param upon clicking close panel button', async () => {
    const { setSearchParamsMock } = await renderComponent();

    const button = screen.getByRole('button', { name: /x/i });

    const user = userEvent.setup();
    await user.click(button);

    expect(setSearchParamsMock).toHaveBeenCalled();
  });
});
