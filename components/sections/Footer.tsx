import { Truck, MapPin, Phone, Mail, Clock, ShieldCheck, UserCheck } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Profil CV. Giri Nusa Persada', href: '#profil' },
  { label: 'Katalog Armada (3 - 10 Ton)', href: '#armada' },
  { label: 'Kalkulator Safety Beban', href: '#kalkulator' },
  { label: 'Form Pengajuan Mandiri', href: '#pengajuan-sewa' },
  { label: 'Portal Cek Status Pengajuan', href: '#cek-status' },
];

const armadaLinks = [
  'Forklift Diesel 3 Ton',
  'Forklift Diesel 3.5 Ton',
  'Forklift Diesel 5 Ton',
  'Forklift Diesel 7 Ton',
  'Forklift Diesel 8 Ton',
  'Forklift Diesel 10 Ton',
  'Mobile Crane 15 - 25 Ton (Rekanan)',
  'Excavator PC75 - PC200 (Rekanan)',
];

export function Footer() {
  return (
    <footer id="kontak" className="relative bg-slate-950 text-white">
      {/* Top CTA Strip */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Layanan Cepat &amp; Tanggap
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl mt-1">
                Butuh Sewa Forklift atau Alat Berat di Jateng &amp; DIY?
              </h3>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
                Ajukan kebutuhan Anda secara online untuk mendapatkan Kode Pengajuan, atau hubungi langsung via WhatsApp ke tim Bpk. Muhammad Fajru.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#pengajuan-sewa">
                <button className="rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/20 transition-transform hover:scale-105">
                  Isi Form Pengajuan Sewa
                </button>
              </a>
              <a
                href="https://wa.me/6281234567890?text=Halo%20GNP%20Heavy%20Equipment,%20saya%20ingin%20sewa%20alat%20berat."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 px-5 py-3.5 text-sm font-bold text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-amber-400" />
                Chat WhatsApp PIC
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-black shadow-md">
                <Truck className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <span className="block text-xl font-black tracking-tight text-white">
                  GNP<span className="text-amber-400">HE</span>
                </span>
                <span className="block text-xs font-bold text-slate-400 tracking-wider uppercase">
                  CV. Giri Nusa Persada
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-md">
              Penyedia layanan sewa forklift dan alat berat berbasis di Semarang. 
              Melayani kebutuhan bongkar muat pabrik, gudang, dan proyek infrastruktur 
              di seluruh wilayah Jawa Tengah dan Daerah Istimewa Yogyakarta dengan standar K3 dan operator berlisensi SIO.
            </p>

            <ul className="mt-6 space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <span>
                  <strong>Workshop &amp; Pool Alat Berat:</strong> Semarang, Jawa Tengah, Indonesia.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <span>
                  <strong>PIC / Owner:</strong> Bpk. Muhammad Fajru (WhatsApp Aktif 24/7)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Operasional:</strong> Senin – Sabtu (Dukungan Darurat 24 Jam)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Legalitas:</strong> NIB Terdaftar, K3 &amp; Operator SIO Resmi
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="lg:col-span-4 sm:col-span-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Navigasi Halaman
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-amber-400 transition-colors">
                    &rarr; {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-amber-400/80 hover:text-amber-300 font-bold"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  Portal Internal Admin &amp; Owner (RBAC)
                </a>
              </li>
            </ul>
          </div>

          {/* Fleet List (3 cols) */}
          <div className="lg:col-span-3 sm:col-span-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Katalog Armada Utama
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-400">
              {armadaLinks.map((armada) => (
                <li key={armada} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{armada}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <strong>CV. Giri Nusa Persada</strong> &bull; GNP Heavy Equipment. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-amber-500/70 font-mono text-[11px]">
              Domain Utama: gnpheavyequipment.com
            </span>
            <a href="/admin" className="hover:text-slate-300 transition-colors">
              Panel Internal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
