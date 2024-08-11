import { json } from '@remix-run/react';
import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Index from '~/routes/_index';
import { store } from '~/store/store';
import { CardType } from '../../app/types';

function newRemixStub(cards: CardType[], detailedCard?: CardType) {
  return createRemixStub([
    {
      path: '/',
      Component: Index,
      loader() {
        return json({
          getCardsResponse: {
            data: cards,
            totalCount: 0,
          },
          ...(detailedCard
            ? {
                getCardResponse: {
                  data: detailedCard,
                },
              }
            : {}),
        });
      },
    },
  ]);
}

describe('HomePage', () => {
  it('should render not items', async () => {
    const RemixStub = newRemixStub([]);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    const notItems = await screen.findByText(/No items/i);

    expect(notItems).toBeInTheDocument();
  });

  it('should render a detailed card', async () => {
    const card = {
      id: '1',
      name: 'Card',
      flavorText: 'Description',
      images: { small: 'small', large: 'large' },
    } as CardType;

    const RemixStub = newRemixStub([], card);

    render(
      <Provider store={store}>
        <RemixStub />
      </Provider>
    );

    const notItems = await screen.findByText(/No items/i);

    expect(notItems).toBeInTheDocument();
  });
});
