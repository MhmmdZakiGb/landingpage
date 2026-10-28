'use client';

import { ShieldCheck, Award, Users, Building2 } from 'lucide-react';

const highlights = [
  { icon: Users, value: '50+', label: 'Operator Bersertifikasi' },
  { icon: Building2, value: '120+', label: 'Unit Armada' },
  { icon: Award, value: '15', label: 'Tahun Pengalaman' },
  { icon: ShieldCheck, value: '100%', label: 'Kepatuhan K3' },
];

export function About() {
  return (
    <section id="profil" className="relative bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/69483/pexels-photo-69483.jpeg?auto=compress&cs=tinysrgb&w=940"
                alt="Lokasi konstruksi dengan alat berat"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-border bg-card p-5 shadow-xl sm:block">
              <div className="text-3xl font-extrabold text-primary">350+</div>
              <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Proyek Diselesaikan
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Profil Kami
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              Mitra Alat Berat untuk Kontraktor &amp; Manufaktur Indonesia
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Garuda Heavy Equipment berdiri sejak 2011, tumbuh menjadi
              penyedia layanan sewa alat berat terpercaya di Jawa dan sekitarnya.
              Kami menggabungkan armada milik sendiri dengan jaringan unit
              rekanan untuk memastikan ketersediaan unit tanpa kompromi pada
              kualitas dan keselamatan.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Setiap unit menjalani inspeksi rutin dan hanya dioperasikan oleh
              teknisi serta operator bersertifikasi. Komitmen kami sederhana:
              armada siap pakai, approval cepat, dan dukungan teknis 24/7.
            </p>

            {/* Stats grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="rounded-xl border border-border bg-muted/30 p-4 text-center"
                  >
                    <Icon className="mx-auto h-6 w-6 text-primary" />
                    <div className="mt-2 text-xl font-extrabold">{h.value}</div>
                    <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {h.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}