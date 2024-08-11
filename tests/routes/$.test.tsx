import { json } from '@remix-run/react';
import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '~/routes/$';

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: NotFoundPage,
    loader() {
      return json({ message: 'hello' });
    },
  },
]);

describe('NotFoundPage', () => {
  it('should render not found page', async () => {
    render(<RemixStub />);

    const notExists = await screen.findByText(/not exists/i);
    const homeButton = await screen.findByRole('button', { name: /home/i });

    expect(notExists).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
  });
});
