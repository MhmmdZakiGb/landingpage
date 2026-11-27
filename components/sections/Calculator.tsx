'use client';

import { useState } from 'react';
import { Calculator as CalcIcon, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArmadaUnits } from '@/hooks/use-armada-units';
import { submitSimulasi } from '@/lib/api';
import { HeavyEquipmentUnit } from '@/lib/types/booking';

interface CalculatorProps {
  onSelectUnitForBooking?: (unitId: string, weight: number) => void;
}

export function Calculator({ onSelectUnitForBooking }: CalculatorProps) {
  const { units } = useArmadaUnits();
  const [weight, setWeight] = useState<number>(3.0);
  const [duration, setDuration] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Sesuai keputusan final: Rekomendasi difokuskan pada kapasitas muatan (tonase)
  // di mana kapasitas unit >= berat beban muatan klien
  const availableForklifts = units.filter(
    (u) => u.category === 'Forklift' && u.source === 'Milik GNP'
  );

  const matchedForklifts = availableForklifts
    .filter((u) => u.capacityTon >= weight)
    .sort((a, b) => a.capacityTon - b.capacityTon);

  const recommendedUnit: HeavyEquipmentUnit | undefined = matchedForklifts[0];

  const handleApplyToBooking = (unit: HeavyEquipmentUnit) => {
    submitSimulasi({
      jenis_kebutuhan: 'Angkat Muatan Proyek',
      kapasitas_beban: weight,
      lokasi_proyek: 'Semarang / Jawa Tengah',
      periode_penggunaan: `${duration} Shift`,
      jenis_unit: unit.category.toLowerCase(),
    }).catch(() => {
      // Non-blocking: simulasi logging is best-effort
    });

    if (onSelectUnitForBooking) {
      onSelectUnitForBooking(unit.id, weight);
    }
    const formEl = document.getElementById('pengajuan-sewa');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="kalkulator" className="relative bg-[#fff1e5]/60 text-[#221a12] py-16 lg:py-20 border-y border-[#e8d8c8] overflow-hidden">
      {/* Background subtle glow effects */}
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#f59e0b]/15 blur-[130px] pointer-events-none" />
      <div className="absolute -right-40 top-1/3 w-96 h-96 rounded-full bg-[#f59e0b]/15 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d8c8] bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#855300] shadow-sm">
            <CalcIcon className="h-4 w-4 text-[#d97706]" />
            Simulasi Kebutuhan Alat Berat
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl text-balance text-[#221a12]">
            Kalkulator Rekomendasi <span className="text-[#d97706]">Kapasitas Forklift</span>
          </h2>
          <p className="mt-3 text-sm text-[#534434] sm:text-base leading-relaxed">
            Masukkan perkiraan beban muatan Anda. Sistem kami akan merekomendasikan unit forklift GNP
            yang paling aman (safety headroom) dan efisien untuk operasional proyek Anda di Jateng &amp; DIY.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Form: Inputs */}
          <div className="lg:col-span-5 rounded-3xl border border-[#e8d8c8] bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              Parameter Muatan &amp; Durasi
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Geser slider atau masukkan angka tonase barang yang akan diangkat.
            </p>

            <div className="mt-7 space-y-6">
              {/* Weight Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="weight-slider" className="text-sm font-semibold text-slate-700">
                    Perkiraan Berat Beban:
                  </label>
                  <span className="text-2xl font-black text-amber-600 font-mono">
                    {weight.toFixed(1)} <span className="text-sm text-slate-500 font-sans">Ton</span>
                  </span>
                </div>
                <input
                  id="weight-slider"
                  type="range"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
                  <span>0.5 T</span>
                  <span>3 T</span>
                  <span>5 T</span>
                  <span>7 T</span>
                  <span>10 T</span>
                  <span>12 T</span>
                </div>
              </div>

              {/* Duration in shifts */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="duration-input" className="text-sm font-semibold text-slate-700">
                    Rencana Durasi Sewa:
                  </label>
                  <span className="text-lg font-bold text-amber-600 font-mono">
                    {duration} <span className="text-sm text-slate-500 font-sans">Shift / Hari</span>
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 7].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDuration(val)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${duration === val
                        ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                    >
                      {val} {val === 7 ? 'Hari' : 'Shift'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date selection for schedule checking */}
              <div>
                <label htmlFor="calc-date" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Rencana Tanggal Pengerjaan:
                </label>
                <input
                  id="calc-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Ketersediaan unit di pool Semarang akan dicek oleh Admin berdasarkan tanggal ini.
                </p>
              </div>

              {/* Note on advanced specs */}
              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-amber-900 block mb-1">
                  💡 Catatan Teknis Tambahan:
                </span>
                Kebutuhan tinggi angkat (mast &gt; 4m), jenis ban (pneumatic/solid untuk lantai gudang),
                atau lampiran khusus (paper roll/fork positioner) dapat Anda isi di kolom
                <em> &quot;Keterangan Tambahan&quot;</em> pada formulir untuk diverifikasi Tim Operasional saat penetapan harga akhir.
              </div>
            </div>
          </div>

          {/* Right Card: Recommendation Result */}
          <div className="lg:col-span-7">
            {weight > 10 ? (
              /* If weight exceeds GNP's direct forklift fleet */
              <div className="rounded-3xl border border-amber-300 bg-amber-50 p-8 text-center sm:text-left shadow-lg">
                <div className="flex items-center gap-3 text-amber-800 font-bold text-lg mb-2">
                  <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" />
                  Beban di Atas 10 Ton: Disarankan Menggunakan Mobile Crane
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Forklift pool milik GNP melayani hingga kapasitas 10 Ton. Untuk beban seberat{' '}
                  <strong className="text-slate-900">{weight} Ton</strong>, kami menyediakan
                  <strong> Unit Rekanan Mobile Crane (15 Ton &amp; 25 Ton)</strong> yang dapat dimobilisasi
                  ke lokasi proyek Anda di Semarang, Solo, DIY, dan sekitarnya.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#armada">
                    <Button className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black gap-2 shadow-md">
                      <Truck className="h-4 w-4" />
                      Lihat Unit Rekanan Crane
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20GNP,%20saya%20butuh%20alat%20berat%20untuk%20beban%20di%20atas%2010%20ton."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-50 font-bold">
                      Konsultasi dengan Tim GNP
                    </Button>
                  </a>
                </div>
              </div>
            ) : recommendedUnit ? (
              /* Recommended Unit Card */
              <div className="rounded-3xl border-2 border-amber-400 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 rounded-full bg-amber-400 text-slate-950 px-3.5 py-1 text-xs font-black uppercase tracking-wider shadow-sm">
                  Rekomendasi Utama
                </div>

                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-800">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                  Safety Calculation: Kapasitas Memenuhi Standar
                </div>

                <div className="mt-4 grid sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200">
                    <img
                      src={recommendedUnit.image}
                      alt={recommendedUnit.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="sm:col-span-7">
                    <h4 className="text-2xl font-black text-slate-900">
                      {recommendedUnit.name}
                    </h4>
                    <p className="text-xs text-amber-700 font-bold mt-1">
                      Sumber: {recommendedUnit.source} &bull; Pool Semarang
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-800">
                        Kapasitas: {recommendedUnit.capacityTon} Ton
                      </span>
                      <span className="rounded-lg bg-emerald-50 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-800">
                        Safety Margin: +{(recommendedUnit.capacityTon - weight).toFixed(1)} Ton
                      </span>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                      {recommendedUnit.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price and Action Section */}
                <div className="mt-7 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">
                      Estimasi Biaya Dasar Sewa:
                    </span>
                    <div className="text-2xl font-black text-amber-600 font-mono">
                      Rp {(recommendedUnit.basePricePerShift * duration).toLocaleString('id-ID')}
                      <span className="text-xs font-sans text-slate-500 font-normal">
                        {' '}({duration} Shift &bull; Inc. Operator &amp; BBM)
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block">
                      *Biaya Mob-Demob dihitung terpisah saat konfirmasi sesuai lokasi proyek
                    </span>
                  </div>

                  <Button
                    size="lg"
                    onClick={() => handleApplyToBooking(recommendedUnit)}
                    className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-950 font-black gap-2 shadow-lg shadow-amber-400/25"
                  >
                    Ajukan Sewa Unit Ini
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}

            {/* Other Alternative Units */}
            {matchedForklifts.length > 1 && (
              <div className="mt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                  Pilihan Unit Lain yang Juga Memenuhi:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedForklifts.slice(1, 3).map((alt) => (
                    <div
                      key={alt.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-3 hover:border-amber-400 shadow-sm transition-all"
                    >
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{alt.name}</h5>
                        <p className="text-xs text-slate-500">
                          Kapasitas: {alt.capacityTon} Ton &bull; Rp {alt.basePricePerShift.toLocaleString('id-ID')}/shift
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApplyToBooking(alt)}
                        className="border-slate-300 bg-slate-50 text-xs font-bold text-slate-800 hover:bg-amber-400 hover:border-amber-400 hover:text-slate-950 shrink-0 transition-colors"
                      >
                        Pilih
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

