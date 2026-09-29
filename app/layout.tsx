import type { Metadata } from 'next';
import { Playfair_Display, Space_Grotesk, Yatra_One } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-display',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
});

const yatraOne = Yatra_One({
  subsets: ['latin', 'devanagari'],
  weight: '400',
  variable: '--font-devanagari',
});

export const metadata: Metadata = {
  title: 'Kumbhkala — कुम्भकला',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${spaceGrotesk.variable} ${yatraOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
