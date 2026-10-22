import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntroProvider } from '@/context/IntroContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const caveat = localFont({
  src: '../../public/fonts/Caveat-VariableFont_wght.ttf',
  variable: '--font-caveat',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF8F5',
};

export const metadata: Metadata = {
  title: 'INNOVANTA | MANIFEST. BUILD. IMPACT.',
  description:
    'INNOVANTA is an exclusive arena where visionary engineering meets unyielding execution. Forging tomorrow’s technology, culture, and capital.',
  keywords: [
    'INNOVANTA',
    'Deep Tech Summit',
    'Frontier AI',
    'Hardware Engineering',
    'Silicon Systems',
    'Sovereign Architecture',
    'San Francisco',
  ],
  authors: [{ name: 'INNOVANTA' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${caveat.variable} h-full antialiased bg-[#FAF8F5]`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#2C1E16] selection:bg-[#C87D32]/25 selection:text-[#2C1E16]">
        <IntroProvider>
          {/* Fixed Cinematic Navbar with exactly 3 navigation links: HOME | EVENT | ABOUT */}
          <Navbar />

          {/* Main Viewport Content */}
          <div className="flex-1 flex flex-col">{children}</div>

          {/* Persistent Cinematic Footer */}
          <Footer />
        </IntroProvider>
      </body>
    </html>
  );
}
