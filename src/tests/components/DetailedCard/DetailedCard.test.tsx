import { render, screen } from '@testing-library/react';
import { DetailedCard } from '../../../components';
import { CardType } from '../../../types';

vi.mock('react-router-dom');

vi.mock('../../../hooks/useItem');

vi.mock('../../../components/Attacks/Attacks', () => ({
  Attacks: () => <div>Attacks</div>,
}));

type RenderComponentProps = {
  item: CardType | null;
  loading: boolean;
};

describe('DetailedCard', () => {
  const renderComponent = async ({ item, loading }: RenderComponentProps) => {
    const getSearchParamsMock = vi.fn();
    const setSearchParamsMock = vi.fn();
    const routerModule = await import('react-router-dom');
    routerModule.useSearchParams = vi
      .fn()
      .mockReturnValue([{ get: getSearchParamsMock }, setSearchParamsMock]);

    const useItemModule = await import('../../../hooks/useItem');
    useItemModule.useItem = vi.fn().mockReturnValue({
      item,
      loading,
    });

    render(<DetailedCard />);

    return {
      getSearchParamsMock,
      setSearchParamsMock,
    };
  };

  it('should render the DetailedCard"', async () => {
    const card = {
      id: '1',
      name: 'card1',
      flavorText: 'flavorText1',
      images: { small: 'small1', large: 'large1' },
      attacks: ['attack1'],
    } as unknown as CardType;

    await renderComponent({ item: card, loading: false });

    const img = screen.getByRole('img');
    const name = screen.getByText(card.name);
    const description = screen.getByText(card.flavorText!);

    expect(img).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    screen.debug();
  });
});
