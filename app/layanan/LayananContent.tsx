'use client';

import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Search,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { Calculator } from '@/components/sections/Calculator';
import { BookingSection } from '@/components/sections/BookingSection';
import { StatusPortalSection } from '@/components/sections/StatusPortalSection';
import { FAQ } from '@/components/sections/FAQ';
import { useArmadaUnits } from '@/hooks/use-armada-units';
import type { HeavyEquipmentUnit } from '@/lib/types/booking';

const categories = ['Semua Tipe', 'Forklift', 'Mobile Crane', 'Excavator'] as const;
const sources = ['Semua', 'Milik GNP', 'Unit Rekanan'] as const;

export function LayananContent() {
  const { units: armadaUnits } = useArmadaUnits();
  const [selectedUnitId, setSelectedUnitId] = useState('gnp-fl-5');
  const [initialWeight, setInitialWeight] = useState(3);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua Tipe');
  const [activeSource, setActiveSource] = useState<string>('Semua');
  const [detailUnit, setDetailUnit] = useState<HeavyEquipmentUnit | null>(null);

  const filteredUnits = armadaUnits.filter((unit) => {
    const matchesCategory =
      activeCategory === 'Semua Tipe' || unit.category === activeCategory;
    const matchesSource =
      activeSource === 'Semua' || unit.source === activeSource;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      unit.name.toLowerCase().includes(q) ||
      unit.category.toLowerCase().includes(q) ||
      String(unit.capacityTon).includes(q);
    return matchesCategory && matchesSource && matchesSearch;
  });

  function chooseUnit(unit: HeavyEquipmentUnit) {
    setSelectedUnitId(unit.id);
    setInitialWeight(unit.capacityTon);
    setDetailUnit(null);
    document.getElementById('pengajuan-sewa')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="bg-[#fff8f4] text-[#221a12]">
      {/* Katalog Hero KPI Strip */}
      <section className="border-b border-[#f5e6d7] bg-[#fff8f4] py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d8c8] bg-[#fff1e5] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#855300]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#d97706]" />
              Armada Resmi Berlisensi SIO &amp; SILO Sejak 1997
            </span>
            <h2 className="mt-3 text-2xl font-black text-[#221a12] sm:text-3xl">
              Katalog Sewa Forklift &amp; Mobile Crane Semarang &amp; Jawa Tengah
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[#534434] sm:text-sm">
              Pusat reservasi unit heavy duty tersertifikasi K3 Depnaker. Didukung
              teknisi bersertifikat 24 jam, opsi sewa shift harian, bulanan, hingga
              kontrak tahunan proyek industri.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:col-span-6">
            {[
              ['100%', 'Unit Terawat & Kalibrasi'],
              ['28 Thn', 'Pengalaman Proyek'],
              ['0 Insiden', 'Prioritas Keselamatan K3'],
            ].map(([val, lbl]) => (
              <div
                key={lbl}
                className="rounded-2xl border border-[#e8d8c8] bg-white p-4 shadow-sm"
              >
                <p className="text-xl font-black text-[#d97706] sm:text-2xl">{val}</p>
                <p className="mt-1 text-[11px] font-semibold text-[#534434]">{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section id="armada" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#e8d8c8] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#855300]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari jenis alat, kapasitas (ton), atau nama unit..."
                className="w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] py-2.5 pl-10 pr-4 text-xs text-[#221a12] placeholder-[#855300]/60 outline-none focus:border-[#f59e0b] focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    activeCategory === cat
                      ? 'bg-[#0f172a] text-white'
                      : 'border border-[#e8d8c8] bg-[#fff8f4] text-[#534434] hover:border-[#f59e0b]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#f5e6d7] pt-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#534434]">
                Sumber Unit:
              </span>
              {sources.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveSource(src)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    activeSource === src
                      ? 'bg-[#855300] text-white'
                      : 'bg-[#fff1e5] text-[#534434] hover:bg-[#fbebdd]'
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>

            <span className="rounded-lg bg-[#fbebdd] px-3 py-1 text-xs font-bold text-[#855300]">
              {filteredUnits.length} Unit Ditampilkan
            </span>
          </div>
        </div>

        {/* Units Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUnits.map((unit) => (
            <article
              key={unit.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e8d8c8] bg-white shadow-sm transition hover:border-[#f59e0b] hover:shadow-md"
            >
              <div>
                <div className="relative">
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                      unit.source === 'Milik GNP'
                        ? 'bg-[#f59e0b] text-[#221a12]'
                        : 'bg-[#0f172a] text-white'
                    }`}
                  >
                    {unit.source}
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-emerald-500 px-2.5 py-1 text-[10px] font-black text-white shadow-sm">
                    Tersedia
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-black uppercase tracking-wider text-[#d97706]">
                      {unit.category}
                    </span>
                    <span className="font-bold text-[#534434]">
                      Beban Maks: {unit.capacityTon} Ton
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-base font-black text-[#221a12]">
                    {unit.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#534434]">
                    {unit.specs[0]}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-[#f5e6d7] bg-[#fff8f4] p-3 text-[11px]">
                    <div>
                      <span className="text-[#534434]">Tarif / Shift:</span>
                      <p className="font-mono font-black text-[#221a12]">
                        Rp {unit.basePricePerShift.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#534434]">Basis Pangkalan:</span>
                      <p className="font-bold text-[#221a12]">
                        {unit.source === 'Milik GNP'
                          ? 'Depo Kalibanteng'
                          : 'Mitra Terverifikasi'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#f5e6d7] p-4">
                <button
                  type="button"
                  onClick={() => setDetailUnit(unit)}
                  className="rounded-xl border border-[#e8d8c8] bg-[#fff8f4] py-2.5 text-xs font-bold text-[#221a12] transition hover:border-[#f59e0b] hover:bg-[#fff1e5]"
                >
                  Lihat Detail
                </button>
                <button
                  type="button"
                  onClick={() => chooseUnit(unit)}
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#f59e0b] py-2.5 text-xs font-black text-[#221a12] shadow-sm transition hover:bg-[#d97706] hover:text-white"
                >
                  Ajukan Sewa <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Unit Detail Modal (matching detail.png) */}
      {detailUnit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setDetailUnit(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#e8d8c8] bg-[#fff8f4] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block rounded-md bg-[#f59e0b] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#221a12]">
                  {detailUnit.source} &bull; {detailUnit.category}
                </span>
                <h3 className="mt-2 text-2xl font-black text-[#221a12]">
                  {detailUnit.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailUnit(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e8d8c8] bg-white text-[#534434] hover:text-[#221a12]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <img
              src={detailUnit.image}
              alt={detailUnit.name}
              className="mt-4 aspect-[16/9] w-full rounded-2xl border border-[#e8d8c8] object-cover"
            />

            <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-[#e8d8c8] bg-white p-4 text-xs">
              <div>
                <span className="text-[#534434]">Kapasitas Maksimal:</span>
                <p className="font-black text-[#221a12]">{detailUnit.capacityTon} Ton</p>
              </div>
              <div>
                <span className="text-[#534434]">Tarif Sewa Shift (8 Jam):</span>
                <p className="font-mono font-black text-[#d97706]">
                  Rp {detailUnit.basePricePerShift.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#e8d8c8] bg-white p-4">
              <p className="text-xs font-black uppercase tracking-wider text-[#855300]">
                Spesifikasi &amp; Kelengkapan
              </p>
              <ul className="mt-2.5 space-y-2">
                {detailUnit.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-start gap-2 text-xs text-[#534434]"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d97706]" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => chooseUnit(detailUnit)}
                className="flex-1 rounded-xl bg-[#f59e0b] py-3 text-xs font-black text-[#221a12] shadow-sm hover:bg-[#d97706] hover:text-white"
              >
                Ajukan Sewa Unit Ini Langsung
              </button>
              <a
                href="https://wa.me/6287839788721"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#d8c3ad] bg-white px-4 py-3 text-xs font-bold text-[#221a12] hover:border-[#f59e0b]"
              >
                <Phone className="h-3.5 w-3.5 text-[#d97706]" />
                Chat Tim Dispatcher
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Simulator, Booking Form, Status Portal, FAQ */}
      <Calculator
        onSelectUnitForBooking={(unitId, weight) => {
          setSelectedUnitId(unitId);
          setInitialWeight(weight);
          document.getElementById('pengajuan-sewa')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <BookingSection selectedUnitId={selectedUnitId} initialWeight={initialWeight} />
      <StatusPortalSection />
      <FAQ />

      {/* Bottom Dark CTA Strip */}
      <section className="bg-[#0f172a] py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#f59e0b]">
              Fast Response Proyek Industri
            </span>
            <h2 className="mt-1.5 text-2xl font-black">
              Butuh Mobilisasi Cepat Hari Ini atau Penyesuaian Kapasitas Khusus?
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs text-slate-300">
              Hubungi dispatch logistik CV Giri Nusa Persada langsung. Garansi teknisi
              siaga 24 jam di seluruh Jawa Tengah &amp; DIY.
            </p>
          </div>
          <a
            href="https://wa.me/6287839788721"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#f59e0b] px-5 py-3 text-xs font-black text-[#221a12] hover:bg-[#d97706] hover:text-white"
          >
            <Phone className="h-4 w-4" />
            WhatsApp Hotline: 0878-3978-8721
          </a>
        </div>
      </section>
    </div>
  );
}
