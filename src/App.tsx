import { Component } from 'react';
import { MainPage } from './pages';
import { ErrorBoundary, Fallback } from './components';

export class App extends Component {
  render(): JSX.Element {
    return (
      <ErrorBoundary fallback={<Fallback />}>
        <MainPage />
      </ErrorBoundary>
    );
  }
}
