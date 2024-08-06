import { ErrorBoundary, Fallback } from '@/components';
import { ThemeProvider } from '@/context';
import { AppState, wrapper } from '@/store/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import './_app.css';
import Head from 'next/head';

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialState: AppState }>) {
  const store = wrapper.useStore();

  return (
    <>
      <Head>
        <title>Pokémon TCG</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary fallback={<Fallback />}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </>
  );
}
