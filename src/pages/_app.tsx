import { ThemeProvider } from '@/context';
import { Layout } from '@/layouts/Layout';
import { wrapper } from '@/store/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import './_app.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
