import { Truck, MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const navCols = [
  {
    title: 'Perusahaan',
    links: ['Beranda', 'Profil Kami', 'Layanan', 'Blog', 'Kontak'],
  },
  {
    title: 'Layanan',
    links: ['Sewa Forklift', 'Sewa Mobile Crane', 'Sewa Excavator', 'Sewa Dump Truck', 'Jasa Operator'],
  },
  {
    title: 'Armada',
    links: ['Forklift 3 Ton', 'Forklift 7 Ton', 'Mobile Crane 14 Ton', 'Excavator PC100', 'Loader WA200'],
  },
];

const socials = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

export function Footer() {
  return (
    <footer
      id="kontak"
      className="relative bg-secondary text-secondary-foreground"
    >
      {/* Top CTA strip */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-background sm:text-3xl text-balance">
                Siap mobilisasi untuk proyek Anda?
              </h3>
              <p className="mt-2 text-background/60">
                Tim kami merespons kurang dari 2 jam pada jam kerja.
              </p>
            </div>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 animate-pulse-glow"
            >
              <Phone className="h-5 w-5" />
              Ajukan Sewa Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr]">
          {/* Left: brand & contact */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
                <Truck className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <span className="block text-lg font-extrabold tracking-tight text-background">
                  GARUDA<span className="text-primary">HE</span>
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-background/50">
                  Heavy Equipment
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/60">
              Penyewaan alat berat profesional dengan armada terawat,
              bersertifikasi, dan jaringan unit rekanan untuk proyek di seluruh
              Indonesia.
            </p>

            {/* Contact details */}
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-background/70">
                  Jl. Industri Raya No. 88, Kawasan Industri Cibitung,
                  Bekasi 17520, Jawa Barat
                </span>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-background/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-5 w-5 shrink-0 text-primary" />
                  +62 812 3456 7890 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-background/70">info@garudahe.co.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-background/70">
                  Senin–Sabtu 08.00–17.00 WIB | Dukungan teknis 24/7
                </span>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-background/10 bg-background/5 text-background/60 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {navCols.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold uppercase tracking-wider text-background">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-background/60 transition-colors hover:text-primary"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-background/50 sm:flex-row">
            <p>&copy; 2026 Garuda Heavy Equipment. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-primary">Kebijakan Privasi</a>
              <a href="#" className="hover:text-primary">Syarat &amp; Ketentuan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
