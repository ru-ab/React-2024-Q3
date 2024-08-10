import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Fallback } from './components';
import './root.css';

export default function Root() {
  return (
    <Document title="Pokémon TCG">
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  return (
    <Document title="Oops...">
      <Fallback />
    </Document>
  );
}

function Document(props: { children: React.ReactNode; title: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">
          <Provider store={store}>{props.children}</Provider>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
