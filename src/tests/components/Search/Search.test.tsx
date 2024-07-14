import { render, screen } from '@testing-library/react';
import { Search } from '../../../components';
import { SearchProps } from '../../../components/Search/Search.props';
import userEvent from '@testing-library/user-event';

describe('Search', () => {
  const renderComponent = (props: SearchProps) => {
    render(<Search {...props} />);

    const input = screen.getByRole('searchbox') as HTMLInputElement;
    const button = screen.getByRole('button');

    return {
      input,
      button,
    };
  };

  it('should render search text', async () => {
    const searchText = 'search text';

    const { input } = renderComponent({
      search: searchText,
      setSearch: () => {},
    });

    expect(input.value).toBe(searchText);
  });

  it('should call setSearch on submit', async () => {
    const searchText = 'search text';
    const setSearch = vi.fn();

    const { input, button } = renderComponent({
      search: '',
      setSearch,
    });

    const user = userEvent.setup();
    await user.type(input, searchText);
    await user.click(button);

    expect(input.value).toBe(searchText);
    expect(setSearch).toHaveBeenCalledWith(searchText);
  });
});
