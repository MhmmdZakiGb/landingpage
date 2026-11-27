'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useArmadaUnits } from '@/hooks/use-armada-units';
import { HeavyEquipmentUnit } from '@/lib/types/booking';

interface CatalogProps {
  onSelectUnit?: (unitId: string) => void;
}

export function Catalog({ onSelectUnit }: CatalogProps) {
  const { units } = useArmadaUnits();
  const [activeFilter, setActiveFilter] = useState<'all' | 'gnp' | 'rekanan'>('all');

  const gnpCount = units.filter((u) => u.source === 'Milik GNP').length;
  const rekananCount = units.filter((u) => u.source === 'Unit Rekanan').length;

  const filteredUnits = units.filter((u) => {
    if (activeFilter === 'gnp') return u.source === 'Milik GNP';
    if (activeFilter === 'rekanan') return u.source === 'Unit Rekanan';
    return true;
  });

  const handleBookUnit = (unitId: string) => {
    if (onSelectUnit) {
      onSelectUnit(unitId);
    }
    const formEl = document.getElementById('pengajuan-sewa');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="armada" className="relative bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/70 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Truck className="h-3.5 w-3.5" />
              Katalog Armada Lengkap
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl text-balance">
              Armada Forklift &amp; Alat Berat Siap Mobilisasi
            </h2>
            <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
              Unit Forklift 3–10 Ton milik pool sendiri di Semarang serta ketersediaan Mobile Crane &amp; Excavator rekanan terverifikasi untuk proyek Anda di Jateng &amp; DIY.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm self-start md:self-end">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${activeFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
            >
              Semua ({units.length})
            </button>
            <button
              onClick={() => setActiveFilter('gnp')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${activeFilter === 'gnp'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
            >
              Milik GNP ({gnpCount})
            </button>
            <button
              onClick={() => setActiveFilter('rekanan')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${activeFilter === 'rekanan'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
            >
              Sumber: Unit Rekanan ({rekananCount})
            </button>
          </div>
        </div>

        {/* Card Grid */}
        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-400"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={unit.image}
                  alt={unit.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Source badge: Sesuai aturan bisnis, jika rekanan cukup tampilkan "Sumber: Unit Rekanan" */}
                <div className="absolute left-3.5 top-3.5">
                  <Badge
                    className={`font-black text-xs px-3 py-1 shadow-md border-0 ${unit.source === 'Milik GNP'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-900 text-amber-300'
                      }`}
                  >
                    {unit.source === 'Milik GNP' ? (
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-950" />
                        Milik Sendiri (GNP)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        Sumber: Unit Rekanan
                      </span>
                    )}
                  </Badge>
                </div>

                {/* Capacity badge */}
                <div className="absolute bottom-3.5 right-3.5 rounded-xl bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 text-sm font-black text-amber-400 shadow-lg">
                  Kapasitas: {unit.capacityTon} Ton
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      {unit.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-semibold mt-0.5 block">
                      Kategori: {unit.category}
                    </span>
                  </div>
                </div>

                {/* Specs list */}
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                  {unit.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                {/* Features (Include Operator SIO & BBM) */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {unit.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex-1 min-h-[1.5rem]" />

                {/* Pricing & CTA */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Estimasi Sewa / Shift
                    </span>
                    <span className="text-lg font-black text-slate-900 font-mono">
                      Rp {unit.basePricePerShift.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleBookUnit(unit.id)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs gap-1.5 px-4 shadow-sm"
                  >
                    Ajukan Sewa
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
