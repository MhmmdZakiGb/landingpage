import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '800'] });

export const metadata: Metadata = {
  title: 'Garuda Heavy Equipment — Sewa Alat Berat Terpercaya',
  description:
    'Penyewaan alat berat profesional: forklift, mobile crane, excavator, dan unit pendukung. Armada terawat, bersertifikasi, dengan approval cepat untuk proyek Anda.',
  openGraph: {
    title: 'Garuda Heavy Equipment — Sewa Alat Berat Terpercaya',
    description:
      'Penyewaan alat berat profesional dengan armada terawat, jaringan unit rekanan, dan approval cepat.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
