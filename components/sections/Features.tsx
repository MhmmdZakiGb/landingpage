'use client';

import {
  Calculator,
  ShieldCheck,
  Network,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Calculator,
    title: 'Kalkulator Safety Kebutuhan',
    description:
      'Estimasi kebutuhan unit dan shift dengan kalkulator cerdas kami. Hitung beban, jangkauan, dan durasi untuk hasil yang presisi.',
  },
  {
    icon: ShieldCheck,
    title: 'Armada Terawat & Tersertifikasi',
    description:
      'Setiap unit melalui inspeksi berkala dan SIO. Operator berlisensi SILO/SIKOJA untuk menjamin keselamatan proyek Anda.',
  },
  {
    icon: Network,
    title: 'Jaringan Unit Rekanan',
    description:
      'Akses 300+ unit dari mitra terverifikasi. Tingkatkan kelangsungan proyek dengan armada cadang yang siap disiapkan.',
  },
  {
    icon: Zap,
    title: 'Approval Cepat',
    description:
      'Proses penawaran dan approval kurang dari 2 jam pada jam kerja. Tidak ada hambatan, langsung mobilisasi ke lokasi.',
  },
];

export function Features() {
  return (
    <section id="layanan" className="relative bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Layanan Utama
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-balance">
            Mengapa Memilih Garuda Heavy Equipment
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Dari perencanaan hingga mobilisasi, kami memastikan setiap unit siap
            beroperasi aman dan tepat waktu.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Accent line */}
                <div className="absolute inset-x-0 top-0 h-1 bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}