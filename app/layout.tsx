import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '800'] });

export const metadata: Metadata = {
  title: 'GNP Heavy Equipment — Sewa Forklift & Alat Berat Semarang, Jateng & DIY',
  description:
    'CV. Giri Nusa Persada - Penyedia jasa sewa Forklift 3-10 Ton pool Semarang serta Mobile Crane dan Excavator rekanan di Jawa Tengah & DIY. Include operator berlisensi SIO dan bahan bakar.',
  openGraph: {
    title: 'GNP Heavy Equipment — CV. Giri Nusa Persada (Semarang)',
    description:
      'Solusi sewa alat berat dan forklift harian/shift di Jawa Tengah & DIY. Pengajuan sewa mandiri cepat dengan sistem pelacakan kode pengajuan resmi.',
    images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
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
