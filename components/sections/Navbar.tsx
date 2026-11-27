'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Truck, Phone, Search, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Profil GNP', href: '#profil' },
  { label: 'Katalog Armada', href: '#armada' },
  { label: 'Kalkulator Kebutuhan', href: '#kalkulator' },
  { label: 'Cek Status', href: '#cek-status' },
  { label: 'Kontak', href: '#kontak' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo Brand */}
          <a href="#beranda" className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black">
              <Truck className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-950">
                  GNP<span className="text-amber-500">HE</span>
                </span>
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-800">
                  SEMARANG
                </span>
              </div>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                CV. Giri Nusa Persada
              </span>
            </div>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 xl:gap-2 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-amber-600 hover:bg-amber-50/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action buttons */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <a href="#cek-status">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-slate-300 bg-white font-bold text-slate-800 hover:bg-slate-100"
              >
                <Search className="h-3.5 w-3.5 text-amber-600" />
                Cek Pengajuan
              </Button>
            </a>

            <a
              href="https://wa.me/6281234567890?text=Halo%20GNP%20Heavy%20Equipment,%20saya%20ingin%20konsultasi%20sewa%20alat%20berat%20di%20Jateng/DIY."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" className="gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-sm">
                <Phone className="h-3.5 w-3.5" />
                Hubungi Kami
              </Button>
            </a>

            <a href="/admin" title="Panel Internal Admin & Owner">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-2"
              >
                <UserCheck className="h-3.5 w-3.5 mr-1 text-slate-400" />
                Internal
              </Button>
            </a>
          </div>

          {/* Mobile toggle button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {open && (
          <div className="border-t border-slate-200 bg-white py-4 lg:hidden animate-fade-in shadow-xl">
            <ul className="flex flex-col gap-1.5 px-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 flex flex-col gap-2">
                <a href="#cek-status" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full gap-2 font-bold justify-center border-slate-300">
                    <Search className="h-4 w-4 text-amber-600" />
                    Cek Status Pengajuan
                  </Button>
                </a>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20GNP%20Heavy%20Equipment,%20saya%20ingin%20konsultasi%20sewa%20alat%20berat%20di%20Jateng/DIY."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2 font-black bg-amber-500 hover:bg-amber-600 text-slate-950 justify-center">
                    <Phone className="h-4 w-4" />
                    Hubungi WhatsApp Admin
                  </Button>
                </a>
                <a href="/admin" onClick={() => setOpen(false)} className="text-center py-1">
                  <span className="text-xs text-slate-500 font-semibold underline">
                    Masuk Panel Admin & Owner (Internal)
                  </span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
