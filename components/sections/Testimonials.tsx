'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Budi Hartawan',
    role: 'Project Site Manager',
    company: 'PT Kawasan Industri Kendal Properti',
    location: 'KIK Kendal, Jawa Tengah',
    rating: 5,
    text: 'Sewa forklift 7 ton dari GNP untuk unloading mesin pabrik berjalan sangat lancar. Operator dari GNP memiliki SIO resmi dan sangat disiplin dengan aturan K3 area industri. Sangat kami rekomendasikan.',
  },
  {
    name: 'Ir. Agus Pratama',
    role: 'Head of Warehouse & Logistics',
    company: 'PT Sinar Logistik Semarang',
    location: 'Pelabuhan Tanjung Emas, Semarang',
    rating: 5,
    text: 'Fitur form pengajuan mandirinya sangat praktis. Begitu submit form, langsung dapat kode pengajuan dan sore harinya langsung di-approve oleh Owner (Bpk. Fajru) dengan tarif mob-demob yang sangat masuk akal.',
  },
  {
    name: 'Danang Triyono',
    role: 'Site Engineer',
    company: 'CV Cipta Karya Perkasa',
    location: 'Surakarta / Solo',
    rating: 5,
    text: 'Kami sewa unit rekanan Mobile Crane 25 Ton melalui GNP untuk ereksi rangka atap baja di Solo. Koordinasi lapangan rapi dan unit dalam kondisi prima. Terbukti terpercaya di Jateng.',
  },
  {
    name: 'Sri Handayani',
    role: 'Procurement Specialist',
    company: 'PT Global Apparel Mandiri',
    location: 'Sleman, D.I. Yogyakarta',
    rating: 5,
    text: 'Paket sewanya sudah include operator dan BBM sehingga tim finance kami tidak pusing lagi mengurus reimbursment solar di lokasi. Invoice resmi atas nama CV. Giri Nusa Persada sangat rapi.',
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28 text-white">
      {/* Decorative ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Award className="h-3.5 w-3.5" />
            Kepuasan Pelanggan
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-balance">
            Dipercaya Kontraktor &amp; Industri di Jateng &amp; DIY
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Pengalaman nyata mitra dan kontraktor yang telah menggunakan layanan sewa alat berat dari CV. Giri Nusa Persada.
          </p>
        </div>

        {/* Slider Card */}
        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:p-12 backdrop-blur-md shadow-2xl">
            <Quote className="h-12 w-12 text-amber-500/40" />

            <div className="mt-4">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={`transition-opacity duration-300 ${
                    i === active ? 'block animate-fade-in' : 'hidden'
                  }`}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="mt-5 text-base sm:text-xl font-medium leading-relaxed text-slate-200">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-base font-black text-white">{t.name}</div>
                      <div className="text-xs text-amber-400 font-semibold">
                        {t.role} &bull; {t.company}
                      </div>
                      <div className="text-[11px] text-slate-500">{t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider controls */}
            <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-800/80">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Sebelumnya"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Selanjutnya"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
