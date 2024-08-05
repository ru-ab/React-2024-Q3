import { ErrorBoundary, Fallback } from '@/components';
import { ThemeProvider } from '@/context';
import { wrapper } from '@/store/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import './_app.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary fallback={<Fallback />}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}
