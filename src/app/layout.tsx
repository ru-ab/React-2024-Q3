import { Metadata } from 'next';
import './layout.css';
import { Providers } from './components/Providers';

export const metadata: Metadata = {
  title: 'Pokémon TCG',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
