import { RouteObject } from 'react-router-dom';
import { DetailedCard, ErrorBoundary, Fallback, NotFound } from '../components';
import { Layout } from '../layouts/Layout';

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
        element: <DetailedCard />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
