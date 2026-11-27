'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Profil Kami', href: '/profil' },
  { label: 'Layanan / Katalog', href: '/layanan' },
  { label: 'Simulasi Kebutuhan', href: '/layanan#kalkulator' },
  { label: 'Status Pengajuan', href: '/layanan#cek-status' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/kontak' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#f5e6d7] bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label="CV Giri Nusa Persada, beranda"
        >
          <img
            src="/images/logo-gnp.png"
            alt="CV Giri Nusa Persada - Kunci Keberhasilan Proyek Anda"
            className="h-11 w-auto object-contain sm:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors whitespace-nowrap ${isActive
                  ? 'bg-[#f59e0b] text-[#221a12] shadow-sm'
                  : 'text-[#534434] hover:bg-[#fff1e5] hover:text-[#221a12]'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-2 lg:flex shrink-0">
          <a
            href="https://wa.me/6287839788721"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#f59e0b] px-4 py-2.5 text-xs font-black text-[#221a12] shadow-sm transition hover:bg-[#d97706] hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            Hotline: 0878-3978-8721
          </a>
        
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#f5e6d7] bg-[#fff8f4] text-[#221a12] lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="border-t border-[#f5e6d7] bg-[#fff8f4] px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold ${isActive
                    ? 'bg-[#f59e0b] text-[#221a12]'
                    : 'text-[#534434] hover:bg-[#fff1e5]'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex gap-2">
              <a
                href="https://wa.me/6287839788721"
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-xl bg-[#f59e0b] px-4 py-3 text-center text-xs font-black text-[#221a12]"
              >
                Hotline: 0878-3978-8721
              </a>
            
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function PageHero({
  title,
  breadcrumb,
  subtitle,
  badgeText = 'DEPO KALIBANTENG • SEMARANG BARAT',
}: {
  title: string;
  breadcrumb: string;
  subtitle?: string;
  badgeText?: string;
}) {
  return (
    <>
      {/* Top Breadcrumb & Status Ribbon */}
      <div className="border-b border-[#e8d8c8] bg-[#f5e6d7]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-xs sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[#534434]">
            <Link href="/" className="font-medium hover:text-[#221a12]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#855300]" />
            <span className="font-bold text-[#221a12]">{breadcrumb}</span>
          </nav>

          <div className="flex items-center gap-2 rounded-full bg-[#fff8f4] px-3 py-1 text-[11px] font-bold text-[#221a12] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#d97706]" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>

      {/* Warm Editorial Header */}
      <section className="border-b border-[#f5e6d7] bg-[#fff8f4] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f5e6d7] bg-[#fff1e5] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#855300]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#d97706]" />
            CV. Giri Nusa Persada • Sejak 1997
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-[#221a12] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#534434] sm:text-base">
            {subtitle ||
              'Rental forklift, mobile crane, dan alat berat terpercaya untuk mendukung proyek industri dan logistik di Semarang, Jawa Tengah & DIY.'}
          </p>
        </div>
      </section>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e8d8c8] bg-[#fbebdd] text-[#221a12]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="inline-block">
            <img
              src="/images/logo-gnp.png"
              alt="CV Giri Nusa Persada"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="mt-3 text-xs leading-relaxed text-[#534434]">
            Mitra terpercaya penyedia rental dan pengadaan alat berat konstruksi &amp;
            industri terkemuka di Semarang, Jawa Tengah &amp; D.I. Yogyakarta.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#e8d8c8] bg-[#fff8f4] px-3 py-1.5 text-[11px] font-bold text-[#855300]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#d97706]" />
            Sertifikasi K3 &amp; SILO Depnaker
          </div>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-wider text-[#221a12]">
            Kantor &amp; Depo Operasional
          </h2>
          <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#534434]">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d97706]" />
              <span>
                Jl. WR Supratman Kavling 39, Kalibanteng Kulon, Kec. Semarang Barat,
                Kota Semarang, Jawa Tengah 50145
              </span>
            </li>
            <li className="font-semibold text-[#221a12]">
              Operasional Depo: Siaga 24 Jam
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-wider text-[#221a12]">
            Navigasi Cepat
          </h2>
          <ul className="mt-4 space-y-2 text-xs text-[#534434]">
            <li>
              <Link href="/" className="hover:text-[#d97706] hover:underline">
                Beranda Utama
              </Link>
            </li>
            <li>
              <Link href="/profil" className="hover:text-[#d97706] hover:underline">
                Profil Perusahaan
              </Link>
            </li>
            <li>
              <Link href="/layanan" className="hover:text-[#d97706] hover:underline">
                Layanan &amp; Katalog Alat
              </Link>
            </li>
            <li>
              <Link
                href="/layanan#kalkulator"
                className="hover:text-[#d97706] hover:underline"
              >
                Simulasi Kebutuhan Alat
              </Link>
            </li>
            <li>
              <Link
                href="/layanan#cek-status"
                className="hover:text-[#d97706] hover:underline"
              >
                Cek Status Sewa
              </Link>
            </li>
            <li>
              <Link href="/kontak" className="hover:text-[#d97706] hover:underline">
                Kontak &amp; Alamat Depo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-black uppercase tracking-wider text-[#221a12]">
            Hotline &amp; Kontak
          </h2>
          <p className="mt-4 text-xs leading-relaxed text-[#534434]">
            Hubungi customer service kami untuk melayani pesanan unit dan konsultasi
            teknis gratis kapan saja.
          </p>
          <ul className="mt-3 space-y-2 text-xs">
            <li>
              <a
                href="tel:+6287839788721"
                className="inline-flex items-center gap-1.5 font-bold text-[#221a12] hover:text-[#d97706]"
              >
                <Phone className="h-3.5 w-3.5 text-[#d97706]" />
                0878-3978-8721 (Telepon/WA)
              </a>
            </li>
            <li>
              <a
                href="mailto:info@gnpheavyequipment.com"
                className="inline-flex items-center gap-1.5 text-[#534434] hover:text-[#d97706]"
              >
                <Mail className="h-3.5 w-3.5 text-[#d97706]" />
                info@gnpheavyequipment.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#e8d8c8] bg-[#f5e6d7]/70 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-[11px] text-[#534434] sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; 2025 CV Giri Nusa Persada (GNP Heavy Equipment). Hak Cipta Dilindungi.</p>
          <p>Semarang, Jawa Tengah &bull; Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
