import { MainPage } from './pages';
import { ErrorBoundary, Fallback } from './components';

export function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <MainPage />
    </ErrorBoundary>
  );
}
