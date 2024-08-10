import { json, LoaderFunctionArgs } from '@remix-run/node';
import { NotFound } from '~/components';
import { ThemeProvider } from '~/context';
import { prefs, type CookieState } from '~/cookie/prefs-cookie';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie: CookieState = (await prefs.parse(cookieHeader)) || {};

  return json({
    theme: cookie.theme,
  });
}

export default function NotFoundPage() {
  return (
    <ThemeProvider>
      <NotFound />
    </ThemeProvider>
  );
}
