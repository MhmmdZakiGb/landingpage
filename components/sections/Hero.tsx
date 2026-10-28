'use client';

import { ArrowRight, Play, ShieldCheck, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '120+', label: 'Unit Armada' },
  { value: '350+', label: 'Proyek Selesai' },
  { value: '15', label: 'Tahun Pengalaman' },
  { value: '24/7', label: 'Dukungan Teknis' },
];

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-secondary pt-24 lg:pt-32"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/13324155/pexels-photo-13324155.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Excavator di lokasi konstruksi"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: content */}
          <div className="text-secondary-foreground">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary animate-fade-up">
              <ShieldCheck className="h-4 w-4" />
              ISO 9001 &amp; K3 Bersertifikasi
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-background sm:text-5xl lg:text-6xl text-balance animate-fade-up animation-delay-100">
              Solusi Sewa{' '}
              <span className="text-primary">Alat Berat</span> untuk Proyek Anda
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/70 sm:text-lg animate-fade-up animation-delay-200">
              Armada terawat dan tersertifikasi, jaringan unit rekanan luas, serta
              approval cepat. Dari forklift hingga mobile crane — siap mobilisasi
              ke seluruh Indonesia.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-up animation-delay-300">
              <Button size="xl" className="gap-2 text-base font-bold">
                Mulai Kebutuhan
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="gap-2 border-background/30 bg-background/10 text-base font-bold text-background hover:bg-background/20 hover:text-background"
              >
                <Play className="h-5 w-5" />
                Lihat Armada
              </Button>
            </div>

            {/* Quick badges */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 animate-fade-up animation-delay-400">
              <div className="flex items-center gap-2 text-sm font-semibold text-background/80">
                <Clock className="h-4 w-4 text-primary" />
                Approval &lt; 2 Jam
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-background/80">
                <Truck className="h-4 w-4 text-primary" />
                MobDemob Seluruh Indonesia
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-background/80">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Asuransi All Risk
              </div>
            </div>
          </div>

          {/* Right: stats card */}
          <div className="hidden lg:block animate-fade-up animation-delay-300">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`rounded-2xl border border-background/10 bg-background/10 p-6 backdrop-blur-md ${
                    i % 2 === 0 ? 'mt-6' : ''
                  }`}
                >
                  <div className="text-3xl font-extrabold text-primary">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-background/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar (mobile) */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:hidden">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-background/10 bg-background/10 p-4 text-center backdrop-blur-md"
            >
              <div className="text-2xl font-extrabold text-primary">
                {s.value}
              </div>
              <div className="mt-0.5 text-xs font-medium text-background/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}