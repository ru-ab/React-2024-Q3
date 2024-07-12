import React, { PropsWithChildren } from 'react';

export type ErrorBoundaryProps = PropsWithChildren & {
  fallback: React.JSX.Element;
};
