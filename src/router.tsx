import { createBrowserRouter } from 'react-router-dom';
import {
  MainPage,
  ReactHookFormPage,
  UncontrolledComponentsPage,
} from '~/pages';

export const router = createBrowserRouter([
  {
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
]);
