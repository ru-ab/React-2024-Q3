import { createBrowserRouter } from 'react-router-dom';
import {
  MainPage,
  ReactHookFormPage,
  UncontrolledComponentsPage,
} from '~/pages';
import { Layout } from './layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/uncontrolled-components',
        element: <UncontrolledComponentsPage />,
      },
      {
        path: '/react-hook-form',
        element: <ReactHookFormPage />,
      },
    ],
  },
]);
