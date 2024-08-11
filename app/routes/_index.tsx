import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Await, defer, json, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { getCard, getCards } from '~/api';
import {
  CardList,
  CardPaginator,
  DetailedCard,
  Flyout,
  Header,
  Main,
  Panel,
  Spinner,
  UnselectWrapper,
} from '~/components';
import { ThemeProvider } from '~/context';
import { prefs, type CookieState } from '~/cookie/prefs-cookie';
import { useLoading } from '~/hooks';
import { store } from '~/store/store';

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page');
  const search = searchParams.get('search')?.trim() ?? null;

  const getCardsResponsePromise = getCards({
    page,
    pageSize: page ? '20' : null,
    search,
  });

  let getCardResponsePromise;
  const details = searchParams.get('details');
  if (details) {
    getCardResponsePromise = getCard({ cardId: details });
  }

  const cookieHeader = request.headers.get('Cookie');
  const cookie: CookieState = (await prefs.parse(cookieHeader)) || {};

  return defer({
    getCardsResponse: getCardsResponsePromise,
    getCardResponse: getCardResponsePromise,
    page,
    theme: cookie.theme,
  });
}

export default function Index() {
  const { getCardsResponse, getCardResponse, page } =
    useLoaderData<typeof loader>();
  const cardListLoading = useLoading(['page', 'search']);
  const detailedCardLoading = useLoading(['details'], false);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <UnselectWrapper>
          <Header />
          <Main>
            {cardListLoading && <Spinner />}
            <Suspense fallback={<Spinner />}>
              <Await resolve={getCardsResponse}>
                {({ data: cards, totalCount }) =>
                  !cardListLoading && (
                    <>
                      <CardPaginator page={page} totalCount={totalCount} />
                      <CardList cards={cards} />
                      <CardPaginator page={page} totalCount={totalCount} />
                    </>
                  )
                }
              </Await>
            </Suspense>
          </Main>
          {(detailedCardLoading || getCardResponse) && (
            <Panel>
              {detailedCardLoading && <Spinner />}
              {getCardResponse && (
                <Suspense fallback={<Spinner />}>
                  <Await resolve={getCardResponse}>
                    {({ data: card }) =>
                      !detailedCardLoading && <DetailedCard card={card} />
                    }
                  </Await>
                </Suspense>
              )}
            </Panel>
          )}
        </UnselectWrapper>
        <Flyout />
      </ThemeProvider>
    </Provider>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie: CookieState = (await prefs.parse(cookieHeader)) || {};
  const formData = await request.formData();

  const theme = formData.get('theme');
  if (theme) {
    cookie.theme = 'light';
  } else {
    cookie.theme = 'dark';
  }

  return json(theme, {
    headers: {
      'Set-Cookie': await prefs.serialize(cookie),
    },
  });
}
