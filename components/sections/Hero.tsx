'use client';

import { ArrowRight, Calculator, ShieldCheck, Clock, MapPin, Truck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '3 - 10 Ton', label: 'Forklift Milik Sendiri (GNP)' },
  { value: 'Jateng & DIY', label: 'Cakupan Wilayah Proyek' },
  { value: 'Include', label: 'Operator SIO & Bahan Bakar' },
  { value: 'K3 & SILO', label: 'Standar Kelayakan Operasi' },
];

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-white pt-24 lg:pt-32"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80"
          alt="Forklift dan alat berat GNP di Semarang"
          className="h-full w-full object-cover opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white" />
      </div>

      {/* Warm ambient glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[380px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: main copy */}
          <div className="lg:col-span-7 text-slate-900">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 animate-fade-up">
              <Award className="h-4 w-4 text-amber-600" />
              CV. Giri Nusa Persada &bull; Pool Semarang
            </div>

            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Sewa Alat Berat &amp; Forklift Handal di{' '}
              <span className="text-amber-500 underline decoration-amber-300 decoration-wavy decoration-2">
                Jateng &amp; DIY
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Solusi sewa <strong>Forklift 3 hingga 10 Ton</strong> milik pool sendiri serta dukungan 
              <strong> Mobile Crane &amp; Excavator</strong> terverifikasi. Layanan paket lengkap include 
              operator berlisensi <strong>SIO aktif</strong>, bahan bakar, dan pemeliharaan berkala.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a href="#kalkulator">
                <Button size="xl" className="w-full sm:w-auto gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25">
                  <Calculator className="h-5 w-5" />
                  Kalkulator Safety Kebutuhan
                </Button>
              </a>
              <a href="#armada">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 border-slate-300 bg-white text-base font-bold text-slate-800 shadow-sm hover:bg-slate-100"
                >
                  <Truck className="h-5 w-5 text-amber-600" />
                  Lihat Katalog Armada
                </Button>
              </a>
            </div>

            {/* Value badges */}
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                Semarang, Solo, DIY &amp; Sekitarnya
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
                Standar K3 &amp; Operator SIO
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock className="h-4 w-4 text-amber-600 shrink-0" />
                Approval Cepat dari Owner
              </div>
            </div>
          </div>

          {/* Right: Quick highlight card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-amber-50/40 p-6 sm:p-8 shadow-xl shadow-slate-200/60 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Sistem Layanan Mandiri
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    GNP Booking Engine
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1">
                  Online 24 Jam
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-100 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Simulasi Beban Safety</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Hitung muatan barang Anda dan dapatkan rekomendasi kapasitas forklift yang tepat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-100 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Dapatkan Kode Pengajuan</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Kirim form tanpa registrasi akun, sistem otomatis menerbitkan kode unik (misal: GNP-2025-XXXXX).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-100 shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Approval Owner &amp; Mob-Demob</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Owner (Bpk. Muhammad Fajru) menetapkan kalkulasi biaya mob-demob transparan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stat grid inside card */}
              <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-2 gap-3">
                {stats.slice(0, 2).map((s) => (
                  <div key={s.label} className="rounded-xl bg-slate-950 text-white p-3">
                    <div className="text-lg font-black text-amber-400">{s.value}</div>
                    <div className="text-[11px] text-slate-300 font-medium leading-tight mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
