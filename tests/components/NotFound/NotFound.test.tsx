import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotFound } from '~/components';

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: () => <div>Home</div>,
  },
  {
    path: '/not-existed-route',
    Component: NotFound,
  },
]);

describe('NotFound', () => {
  const renderComponent = () => {
    render(
      <RemixStub
        initialEntries={['/', '/not-existed-route']}
        initialIndex={1}
      />
    );

    const message = screen.getByText(/page not exists/i);
    const button = screen.getByRole('button', { name: /to home/i });

    return {
      message,
      button,
    };
  };

  it('should render not found page', async () => {
    const { message, button } = renderComponent();

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    const homePage = screen.queryByText('Home');
    expect(homePage).not.toBeInTheDocument();
  });

  it('should navigate to home upon button clicking', async () => {
    const { button } = renderComponent();

    const user = userEvent.setup();
    await user.click(button);

    const homePage = screen.getByText('Home');
    expect(homePage).toBeInTheDocument();
  });
});
