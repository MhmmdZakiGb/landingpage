'use client';

import { ShieldCheck, Award, Users, Building2, MapPin, CheckCircle2 } from 'lucide-react';

const highlights = [
  { icon: Building2, value: '3 - 10 Ton', label: 'Forklift Milik Sendiri' },
  { icon: Users, value: '100% SIO', label: 'Operator Berlisensi' },
  { icon: ShieldCheck, value: 'Standar K3', label: 'Prosedur Safety Depnaker' },
  { icon: MapPin, value: 'Jateng & DIY', label: 'Wilayah Layanan' },
];

export function About() {
  return (
    <section id="profil" className="relative bg-white py-20 lg:py-28 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Image with badge */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                alt="Workshop dan Armada Forklift GNP di Semarang"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            {/* Floating pool badge */}
            <div className="absolute -bottom-6 -right-3 sm:-right-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:block max-w-xs">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <MapPin className="h-4 w-4" />
                Pool Pusat Semarang
              </div>
              <div className="text-lg font-black text-slate-900 mt-1">
                CV. Giri Nusa Persada
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Siap mobilisasi ke kawasan industri di Semarang, Kendal, Batang, Solo, hingga DIY.
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Award className="h-3.5 w-3.5 text-amber-600" />
              Profil Perusahaan
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl text-balance">
              Mitra Solusi Alat Berat &amp; Forklift Terpercaya
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              <strong>CV. Giri Nusa Persada (GNP Heavy Equipment)</strong> adalah perusahaan penyedia jasa 
              sewa alat berat yang berpusat di Semarang, Jawa Tengah. Di bawah kepemimpinan 
              <strong> Bpk. Muhammad Fajru</strong>, kami berkomitmen menghadirkan unit forklift berkualitas 
              tinggi dan dukungan alat berat rekanan untuk menunjang sektor konstruksi, pabrik manufaktur, 
              dan pergudangan logistik di seluruh wilayah Jawa Tengah dan D.I. Yogyakarta.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>Armada Milik Sendiri:</strong> Unit forklift diesel kapasitas 3 Ton, 3.5 Ton, 5 Ton, 7 Ton, 8 Ton, hingga 10 Ton yang dirawat secara berkala di pool Semarang.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>Keselamatan Kerja (K3):</strong> Setiap operator mengantongi Surat Izin Operator (SIO) aktif dengan pemahaman prosedur operasional keselamatan yang ketat.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong>Paket Layanan Include:</strong> Biaya sewa harian/shift sudah mencakup unit, operator berlisensi, bahan bakar (solar), serta perawatan dan suku cadang.
                </p>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
                  >
                    <Icon className="mx-auto h-5 w-5 text-amber-600" />
                    <div className="mt-2 text-lg font-black text-slate-900">{h.value}</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-slate-500 leading-tight">
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
