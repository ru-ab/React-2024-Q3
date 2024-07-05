import { Component } from 'react';
import { ErrorBoundaryProps } from './ErrorBoundary.props';
import { ErrorBoundaryState } from './ErrorBoundary.state';

type Props = Readonly<ErrorBoundaryProps>;
type State = Readonly<ErrorBoundaryState>;

export class ErrorBoundary extends Component<Props, State> {
  readonly state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
