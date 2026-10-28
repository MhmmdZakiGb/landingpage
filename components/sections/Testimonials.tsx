'use client';

import { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

type Testimonial = {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Budi Santoso',
    role: 'Site Manager',
    company: 'PT Karya Bangun Persada',
    rating: 5,
    text: 'Mobilisasi forklift 7 ton ke lokasi proyek kami di Cikarang hanya butuh 1 hari. Unit terawat, operator profesional, tidak ada downtime sama sekali selama 3 bulan sewa.',
  },
  {
    name: 'Sri Wahyuni',
    role: 'Procurement Head',
    company: 'PT Manufaktur Nusantara',
    rating: 5,
    text: 'Approval-nya cepat banget. Kirim RFQ pagi, sore udah dapet penawaran detail dengan rincian mobdemob transparan. Garuda HE jadi vendor prioritas kami.',
  },
  {
    name: 'Agus Prasetyo',
    role: 'Project Director',
    company: 'PT Wijaya Kontraktor',
    rating: 5,
    text: 'Mobile crane 14 ton yang kami sewa untuk proyek jembatan bekerja optimal. Sertifikasi lengkap, safety briefing operator mantap. Sangat membantu kelancaran proyek.',
  },
  {
    name: 'Lina Hartono',
    role: 'Operations Manager',
    company: 'PT Logistik Sejahtera',
    rating: 5,
    text: 'Sudah 4 kali sewa forklift dari Garuda HE. Selalu konsisten armadanya, harganya kompetitif, dan dukungan teknis 24/7 benar-benar terbukti saat ada kendala di lapangan.',
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid-slate opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Testimonial
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-background sm:text-4xl lg:text-5xl text-balance">
            Dipercaya Kontraktor &amp; Manufaktur
          </h2>
          <p className="mt-4 text-base text-background/60 sm:text-lg">
            Lihat apa kata klien kami yang telah mempercayakan kebutuhan alat
            berat mereka kepada Garuda HE.
          </p>
        </div>

        {/* Slider */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative rounded-3xl border border-background/10 bg-background/5 p-8 backdrop-blur-md sm:p-12">
            <Quote className="h-12 w-12 text-primary/40" />

            <div className="mt-4">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={`transition-opacity duration-300 ${
                    i === active
                      ? 'block animate-fade-in'
                      : 'hidden'
                  }`}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-5 text-lg font-medium leading-relaxed text-background/90 sm:text-xl">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-6">
                    <div className="text-base font-bold text-background">
                      {t.name}
                    </div>
                    <div className="text-sm text-background/60">
                      {t.role} — {t.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-8 bg-primary'
                        : 'w-2.5 bg-background/20 hover:bg-background/40'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Sebelumnya"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-background/20 bg-background/5 text-background/80 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Selanjutnya"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-background/20 bg-background/5 text-background/80 transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Logos / trust row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-background/40">
              Dipercaya oleh:
          </span>
          {['PT Karya Bangun Persada', 'PT Manufaktur Nusantara', 'PT Wijaya Kontraktor', 'PT Logistik Sejahtera'].map((c) => (
            <span
              key={c}
              className="text-sm font-bold text-background/50"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}