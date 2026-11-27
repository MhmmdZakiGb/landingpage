'use client';

import {
  Calculator,
  ShieldCheck,
  Truck,
  Zap,
  CheckCircle2,
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
      'Fitur simulasi muatan cerdas untuk merekomendasikan tonase forklift yang paling aman (safety margin) bagi barang Anda sebelum mengajukan sewa.',
  },
  {
    icon: ShieldCheck,
    title: 'Operator SIO & K3 Lengkap',
    description:
      'Semua forklift dioperasikan oleh tenaga ahli berlisensi SIO aktif dengan kepatuhan penuh terhadap standar keselamatan kerja Depnaker.',
  },
  {
    icon: Truck,
    title: 'Paket Include Unit, BBM & Servis',
    description:
      'Tarif sewa dasar harian/shift sudah mencakup unit forklift prima, operator handal, bahan bakar (solar), serta suku cadang dan maintenance rutin.',
  },
  {
    icon: Zap,
    title: 'Portal Kode Pengajuan Mandiri',
    description:
      'Ajukan sewa tanpa ribet login. Dapatkan Kode Pengajuan resmi dan lacak langsung proses persetujuan harga final serta Mob-Demob dari Owner.',
  },
];

export function Features() {
  return (
    <section id="layanan" className="relative bg-slate-50 py-20 lg:py-28 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Keunggulan Layanan
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl text-balance">
            Mengapa Memilih GNP Heavy Equipment?
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Standar operasional tinggi dari CV. Giri Nusa Persada untuk memastikan proyek Anda di Jawa Tengah dan D.I. Yogyakarta berjalan aman, efisien, dan tepat waktu.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-amber-400"
              >
                {/* Accent top stripe */}
                <div className="absolute inset-x-0 top-0 h-1 bg-amber-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-slate-950 font-black">
                  <Icon className="h-7 w-7" strokeWidth={2.2} />
                </div>

                <h3 className="mt-5 text-lg font-black tracking-tight text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
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
