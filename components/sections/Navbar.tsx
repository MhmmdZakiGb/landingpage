'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Truck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Profil Kami', href: '#profil' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Blog', href: '#blog' },
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
          ? 'bg-background/85 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
              <Truck className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-extrabold tracking-tight">
                GARUDA<span className="text-primary">HE</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Heavy Equipment
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-md px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground hover:bg-muted/60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" size="lg" className="gap-2 font-bold">
                <Phone className="h-4 w-4" />
                Hubungi Kami
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-border bg-background py-4 lg:hidden animate-fade-in">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2 font-bold">
                    <Phone className="h-4 w-4" />
                    Hubungi Kami
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}