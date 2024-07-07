import { PropsWithChildren } from 'react';

export type ErrorBoundaryProps = PropsWithChildren & {
  fallback: JSX.Element;
};
