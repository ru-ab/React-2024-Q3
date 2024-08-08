import {
  Flyout,
  Header,
  Main,
  Panel,
  Spinner,
  UnselectWrapper,
} from '@/components';
import { extractPageParams } from '@/utils';
import { Suspense } from 'react';
import FetchCardList from './components/FetchCardList';
import FetchDetailedCard from './components/FetchDetailedCard';

export default async function Page({
  searchParams = {},
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { search, page, pageSize } = extractPageParams(searchParams);
  const cardId = searchParams.details?.toString();

  return (
    <>
      <UnselectWrapper>
        <Header />
        <Main>
          <Suspense key={`${page}${pageSize}${search}`} fallback={<Spinner />}>
            <FetchCardList search={search} page={page} pageSize={pageSize} />
          </Suspense>
        </Main>
        {cardId && (
          <Panel>
            <Suspense key={cardId} fallback={<Spinner />}>
              <FetchDetailedCard cardId={cardId} />
            </Suspense>
          </Panel>
        )}
      </UnselectWrapper>
      <Flyout />
    </>
  );
}
