import type { Metadata } from 'next';
import { Cormorant_Garamond, Noto_Nastaliq_Urdu, Outfit } from 'next/font/google';
import AppThemeProvider from '@/components/AppThemeProvider';
import Cursor from '@/components/Cursor';
import EmotionRegistry from '@/components/EmotionRegistry';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: '--font-urdu',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Syed Shahwaiz Ali Bukhari | Portfolio',
  description: 'Interactive portfolio built with Next.js, MUI, and Framer Motion.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable} ${notoNastaliqUrdu.variable}`}>
      <body>
        <EmotionRegistry options={{ key: 'mui' }}>
          <AppThemeProvider>
            <div className="app-shell">
              <Cursor />
              <div className="grain-overlay" aria-hidden />
              {children}
            </div>
          </AppThemeProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
