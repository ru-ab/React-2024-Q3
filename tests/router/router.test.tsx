import { render, screen } from '@testing-library/react';
import { Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Router } from '@remix-run/router';
import { routes } from '@/router/routes';

vi.mock('@/layouts/Layout', () => ({
  Layout: () => (
    <>
      <div>Layout</div>
      <Outlet />
    </>
  ),
}));

vi.mock('@/components/Panel/Panel', () => ({
  Panel: () => <div>Panel</div>,
}));

vi.mock('@/components/NotFound/NotFound', () => ({
  NotFound: () => <div>NotFound</div>,
}));

describe('Router', () => {
  const renderComponent = (router: Router) => {
    render(<RouterProvider router={router} />);
  };

  it.each([
    {
      pageName: 'layout',
      path: '/',
      text: 'Layout',
    },
    {
      pageName: 'panel',
      path: '/',
      text: 'Panel',
    },
    {
      pageName: 'not found',
      path: '/not-found',
      text: 'NotFound',
    },
  ])('should render the $pageName page for $path', ({ path, text }) => {
    const router = createMemoryRouter(routes, { initialEntries: [path] });

    renderComponent(router);

    const component = screen.getByText(text);
    expect(component).toBeInTheDocument();
  });
});
