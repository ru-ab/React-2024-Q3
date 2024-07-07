import { Component } from 'react';
import { MainPage } from './pages';
import { ErrorBoundary, ErrorMessage } from './components';

export class App extends Component {
  render(): JSX.Element {
    return (
      <ErrorBoundary fallback={<ErrorMessage />}>
        <MainPage />
      </ErrorBoundary>
    );
  }
}
