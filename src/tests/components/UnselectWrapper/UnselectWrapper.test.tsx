import { render, screen } from '@testing-library/react';
import { UnselectWrapper } from '@/components';
import userEvent from '@testing-library/user-event';

vi.mock('@/hooks', () => ({
  useHideDetailedCard: vi.fn().mockReturnValue({
    hideDetailedCard: vi.fn(),
  }),
}));

describe('UnselectWrapper', () => {
  it('should render wrapper', async () => {
    render(<UnselectWrapper>WrapperComponent</UnselectWrapper>);

    const wrappedComponent = screen.getByText('WrapperComponent');

    expect(wrappedComponent).toBeInTheDocument();
  });

  it('should hide detailed card upon clicking', async () => {
    const hideDetailedCardMock = vi.fn();

    const hooksModule = await import('@/hooks');
    hooksModule.useHideDetailedCard = vi.fn().mockReturnValue({
      hideDetailedCard: hideDetailedCardMock,
    });

    render(
      <UnselectWrapper>
        <div>WrapperComponent</div>
      </UnselectWrapper>
    );

    const wrappedComponent = screen.getByText('WrapperComponent');
    const user = userEvent.setup();
    await user.click(wrappedComponent);

    expect(hideDetailedCardMock).toHaveBeenCalled();
  });

  it('should ignore click when if button clicked', async () => {
    const hideDetailedCardMock = vi.fn();

    const hooksModule = await import('@/hooks');
    hooksModule.useHideDetailedCard = vi.fn().mockReturnValue({
      hideDetailedCard: hideDetailedCardMock,
    });

    render(
      <UnselectWrapper>
        <button>WrapperComponent</button>
      </UnselectWrapper>
    );

    const button = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(button);

    expect(hideDetailedCardMock).not.toHaveBeenCalled();
  });
});
