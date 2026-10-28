'use client';

import { ArrowRight, CheckCircle2, Star, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Unit = {
  name: string;
  capacity: string;
  image: string;
  source: 'Milik Sendiri' | 'Rekanan';
  specs: string[];
  rating: number;
};

const units: Unit[] = [
  {
    name: 'Forklift Diesel 3 Ton',
    capacity: '3 Ton',
    image:
      'https://images.pexels.com/photos/29480712/pexels-photo-29480712.jpeg?auto=compress&cs=tinysrgb&w=940',
    source: 'Milik Sendiri',
    specs: ['Mast 4 Meter', 'Diesel Engine', 'Pneumatic Tire'],
    rating: 4.9,
  },
  {
    name: 'Forklift Diesel 7 Ton',
    capacity: '7 Ton',
    image:
      'https://images.pexels.com/photos/18699604/pexels-photo-18699604.jpeg?auto=compress&cs=tinysrgb&w=940',
    source: 'Milik Sendiri',
    specs: ['Mast 4.5 Meter', 'Cummins Engine', 'Side Shift'],
    rating: 4.8,
  },
  {
    name: 'Mobile Crane 14 Ton',
    capacity: '14 Ton',
    image:
      'https://images.pexels.com/photos/35693096/pexels-photo-35693096.jpeg?auto=compress&cs=tinysrgb&w=940',
    source: 'Rekanan',
    specs: ['Boom 21 Meter', '4x4 Drive', 'Telescopic Boom'],
    rating: 4.7,
  },
];

export function Catalog() {
  return (
    <section
      id="armada"
      className="relative bg-gradient-to-b from-muted/40 to-background py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div className="max-w-xl">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Katalog Armada
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              Unit Populer Siap Mobilisasi
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Pilihan alat berat yang paling sering disewa untuk proyek
              kontraktor dan manufaktur di seluruh Indonesia.
            </p>
          </div>
          <a href="#armada" className="hidden shrink-0 sm:block">
            <Button variant="outline" className="gap-2 font-semibold">
              Lihat Semua Unit
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit, i) => (
            <div
              key={unit.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/40 animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                {/* Source badge */}
                <Badge
                  variant={unit.source === 'Milik Sendiri' ? 'default' : 'secondary'}
                  className="absolute left-4 top-4 gap-1.5 px-3 py-1 text-xs font-bold shadow-md"
                >
                  {unit.source === 'Milik Sendiri' ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Star className="h-3.5 w-3.5" />
                  )}
                  {unit.source}
                </Badge>

                {/* Capacity badge */}
                <div className="absolute bottom-4 right-4 rounded-lg bg-primary px-3 py-1.5 text-sm font-extrabold text-primary-foreground shadow-lg">
                  {unit.capacity}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold tracking-tight">
                    {unit.name}
                  </h3>
                  <div className="flex shrink-0 items-center gap-1 text-sm font-bold text-foreground">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    {unit.rating}
                  </div>
                </div>

                {/* Specs */}
                <ul className="mt-4 space-y-2">
                  {unit.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex-1" />

                <Button className="mt-2 w-full gap-2 font-bold">
                  Ajukan Sewa
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Button variant="outline" className="gap-2 font-semibold">
            Lihat Semua Unit
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}