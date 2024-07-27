import { ErrorBoundary, Fallback, NotFound, Panel } from '@/components';
import { Layout } from '@/layouts/Layout';
import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary fallback={<Fallback />}>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <Panel />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
