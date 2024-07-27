import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context';
import { useTheme } from '@/hooks';

function ThemeConsumer() {
  const { theme } = useTheme();

  return <div>{theme}</div>;
}

describe('ThemeProvider', () => {
  it('should provide default theme value', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const themeConsumer = screen.getByText('light');
    expect(themeConsumer).toBeInTheDocument();
  });
});
