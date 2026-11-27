'use client';

import { useState, useEffect } from 'react';
import {
  FileText,
  Send,
  CheckCircle2,
  Copy,
  Phone,
  ShieldCheck,
  AlertCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArmadaUnits } from '@/hooks/use-armada-units';
import { createPengajuan } from '@/lib/api';
import { saveBooking } from '@/lib/storage/booking-store';
import { BookingSubmission } from '@/lib/types/booking';

interface BookingSectionProps {
  selectedUnitId?: string;
  initialWeight?: number;
}

const CITIES_JATENG_DIY = [
  'Kota Semarang',
  'Kabupaten Semarang / Ungaran',
  'Kab. Kendal / KIK (Kawasan Industri Kendal)',
  'Kab. Batang / KITB (Kawasan Industri Terpadu Batang)',
  'Kota Surakarta / Solo',
  'Kab. Karanganyar / Sukoharjo',
  'Kab. Demak / Kudus / Jepara',
  'Kab. Boyolali / Klaten',
  'Kota Yogyakarta / Sleman / Bantul (DIY)',
  'Kab. Cilacap / Banyumas / Purwokerto',
  'Kota / Kab. Tegal / Pekalongan',
  'Kota / Kab. Magelang',
  'Lainnya (Jawa Tengah & Sekitarnya)',
];

export function BookingSection({ selectedUnitId, initialWeight }: BookingSectionProps) {
  const { units } = useArmadaUnits();
  const [unitId, setUnitId] = useState<string>(selectedUnitId || 'gnp-fl-5');
  const [clientName, setClientName] = useState<string>('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [durationShift, setDurationShift] = useState<number>(1);
  const [projectCity, setProjectCity] = useState<string>('Kota Semarang');
  const [projectAddress, setProjectAddress] = useState<string>('');
  const [cargoWeightTon, setCargoWeightTon] = useState<number>(initialWeight || 3.0);
  const [cargoDescription, setCargoDescription] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const [submittedBooking, setSubmittedBooking] = useState<BookingSubmission | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    if (selectedUnitId) setUnitId(selectedUnitId);
  }, [selectedUnitId]);

  useEffect(() => {
    if (units.length > 0 && !units.some((u) => u.id === unitId)) {
      setUnitId(units[0].id);
    }
  }, [units, unitId]);

  useEffect(() => {
    if (initialWeight) setCargoWeightTon(initialWeight);
  }, [initialWeight]);

  const selectedUnit = units.find((u) => u.id === unitId) || units[0];
  const estimatedCost = selectedUnit ? selectedUnit.basePricePerShift * durationShift : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!clientName || !clientPhone || !projectAddress) {
      alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Proyek.');
      return;
    }

    setIsSubmitting(true);

    try {
      const effectiveStart = startDate || new Date().toISOString().split('T')[0];
      const endObj = new Date(effectiveStart);
      endObj.setDate(endObj.getDate() + Math.max(1, durationShift) - 1);
      const effectiveEnd = endObj.toISOString().split('T')[0];

      const numericUnitId = Number(selectedUnit.id);
      let newBooking: BookingSubmission;

      if (Number.isInteger(numericUnitId) && numericUnitId > 0) {
        newBooking = await createPengajuan({
          id_unit: numericUnitId,
          nama: clientName,
          nomor_telepon: clientPhone,
          email: clientEmail || undefined,
          alamat: projectAddress,
          tanggal_mulai: effectiveStart,
          tanggal_selesai: effectiveEnd,
          lokasi_proyek: `${projectCity} - ${projectAddress}`,
          keterangan: [
            clientCompany ? `Perusahaan: ${clientCompany}` : null,
            `Muatan: ${cargoWeightTon} Ton`,
            cargoDescription || null,
            additionalNotes || null,
          ]
            .filter(Boolean)
            .join(' | '),
        });
      } else {
        newBooking = saveBooking({
          clientName,
          clientCompany: clientCompany || 'Perorangan',
          clientPhone,
          clientEmail,
          unitId: selectedUnit.id,
          unitName:
            selectedUnit.source === 'Unit Rekanan'
              ? `${selectedUnit.name} (Sumber: Unit Rekanan)`
              : selectedUnit.name,
          unitCapacityTon: selectedUnit.capacityTon,
          startDate: effectiveStart,
          durationShift: Math.max(1, durationShift),
          projectCity,
          projectAddress,
          cargoWeightTon,
          cargoDescription: cargoDescription || 'Bongkar muat material/mesin proyek',
          additionalNotes: additionalNotes || 'Standard safe operating procedure',
        });
      }

      setSubmittedBooking(newBooking);

      // Trigger custom event so Portal Cek Status can react
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gnp_booking_created', { detail: newBooking }));
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Gagal mengirim pengajuan ke server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = () => {
    if (!submittedBooking) return;
    navigator.clipboard.writeText(submittedBooking.bookingCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const generateWhatsAppUrl = () => {
    if (!submittedBooking) return '#';
    const text = encodeURIComponent(
      `Halo GNP Heavy Equipment,\n\nSaya telah mengajukan sewa alat berat mandiri melalui website dengan rincian:\n*Kode Pengajuan:* ${submittedBooking.bookingCode}\n*Nama Pemohon:* ${submittedBooking.clientName} (${submittedBooking.clientCompany})\n*Unit:* ${submittedBooking.unitName}\n*Durasi:* ${submittedBooking.durationShift} Shift\n*Lokasi:* ${submittedBooking.projectCity} - ${submittedBooking.projectAddress}\n\nMohon dicek jadwal dan konfirmasi biaya Mob-Demob. Terima kasih!`
    );
    return `https://wa.me/6281234567890?text=${text}`;
  };

  return (
    <section id="pengajuan-sewa" className="relative bg-[#fff8f4] py-16 lg:py-24 border-t border-[#e8d8c8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d8c8] bg-[#fff1e5] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#855300]">
            <FileText className="h-3.5 w-3.5 text-[#d97706]" />
            Portal Layanan Operasional Resmi CV GNP
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#221a12] sm:text-4xl text-balance">
            Formulir Pengajuan Sewa <span className="text-[#d97706]">Alat Berat</span>
          </h2>
          <p className="mt-3 text-sm text-[#534434] sm:text-base leading-relaxed">
            Ajukan kebutuhan sewa forklift atau alat berat secara mandiri tanpa perlu membuat akun.
            Sistem kami akan langsung menerbitkan <strong>Kode Pengajuan</strong> yang dapat Anda lacak statusnya kapan saja.
          </p>
        </div>

        {/* Modal / Alert when booking is submitted successfully */}
        {submittedBooking && (
          <div className="mt-10 mx-auto max-w-2xl rounded-3xl border-2 border-emerald-500 bg-emerald-50/90 p-6 sm:p-8 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 text-emerald-800">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 shrink-0" />
              <div>
                <h3 className="text-xl font-black">Pengajuan Berhasil Diterbitkan!</h3>
                <p className="text-xs text-emerald-700">
                  Data Anda telah masuk ke antrean verifikasi Admin GNP.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-5 border border-emerald-200 text-center shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">
                Kode Pengajuan Resmi Anda:
              </span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-slate-950 font-mono tracking-wider">
                {submittedBooking.bookingCode}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Simpan kode ini untuk mengecek status persetujuan harga &amp; mob-demob di menu 
                <strong> &quot;Cek Status&quot;</strong>.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Button
                  onClick={copyCode}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-300 font-bold text-slate-800"
                >
                  <Copy className="h-4 w-4" />
                  {isCopied ? 'Tersalin!' : 'Salin Kode'}
                </Button>

                <a href={generateWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                    <Phone className="h-4 w-4" />
                    Konfirmasi via WhatsApp
                  </Button>
                </a>

                <a href="#cek-status">
                  <Button size="sm" variant="secondary" className="font-bold">
                    Buka Portal Cek Status &darr;
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setSubmittedBooking(null)}
                className="text-xs text-emerald-800 underline hover:text-emerald-950 font-semibold"
              >
                + Buat Pengajuan Baru
              </button>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="mt-12 mx-auto max-w-4xl rounded-3xl border border-[#e8d8c8] bg-white p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bagian 1: Data Pemohon */}
            <div>
              <h3 className="text-lg font-black text-[#221a12] flex items-center gap-2 pb-3 border-b border-[#f5e6d7]">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f59e0b] text-[#221a12] text-xs font-black">
                  1
                </span>
                Data Pemohon &amp; Penanggung Jawab (PIC)
              </h3>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Lengkap PIC <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Bambang Sutrisno"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Perusahaan / Instansi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT Wijaya Karya / CV Mandiri / Perorangan"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Notifikasi konfirmasi dan rincian penawaran akan dikirimkan ke nomor ini.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="Contoh: procurement@perusahaan.co.id"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 2: Pilihan Unit & Waktu */}
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-slate-950 text-xs font-black">
                  2
                </span>
                Spesifikasi Sewa &amp; Jadwal
              </h3>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Pilihan Unit Alat Berat <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={unitId}
                    onChange={(e) => setUnitId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <optgroup label="Forklift Milik Pool GNP (Semarang)">
                      {units.filter((u) => u.source === 'Milik GNP').map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name} - Kapasitas {unit.capacityTon} Ton (Rp{' '}
                          {unit.basePricePerShift.toLocaleString('id-ID')}/shift)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Sumber: Unit Rekanan (Crane & Excavator)">
                      {units.filter((u) => u.source === 'Unit Rekanan').map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name} - Kapasitas {unit.capacityTon} Ton [Unit Rekanan]
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tanggal Rencana Mulai Sewa <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Durasi Sewa (Shift / Hari) <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="90"
                      required
                      value={durationShift}
                      onChange={(e) => setDurationShift(parseInt(e.target.value) || 1)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-xs font-bold text-slate-600 shrink-0">
                      Shift (1 Shift = 8 Jam)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian 3: Lokasi & Teknis Beban */}
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-slate-950 text-xs font-black">
                  3
                </span>
                Lokasi Proyek &amp; Spesifikasi Muatan
              </h3>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kota / Wilayah Layanan (Jateng &amp; DIY) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={projectCity}
                    onChange={(e) => setProjectCity(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    {CITIES_JATENG_DIY.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Estimasi Berat Muatan (Ton)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={cargoWeightTon}
                    onChange={(e) => setCargoWeightTon(parseFloat(e.target.value) || 1)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Alamat Lengkap Lokasi Proyek / Pabrik <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jl. Industri Terboyo Blok D No. 5, Genuk, Semarang"
                    value={projectAddress}
                    onChange={(e) => setProjectAddress(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Alamat ini digunakan Tim Operasional kami untuk menghitung tarif Mobilisasi &amp; Demobilisasi (Mob-Demob).
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Deskripsi Barang / Muatan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Penurunan mesin cetak CNC seberat 4.5 ton dari kontainer"
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Sesuai keputusan final: Kolom Keterangan Tambahan untuk dievaluasi Owner manual */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Keterangan Teknis Tambahan (Opsional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Tinggi angkat mast butuh 4.5 meter, lantai gudang cor beton halus (butuh ban pneumatic/non-marking), medan outdoor becek, dll."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white p-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    *Detail teknis ini akan dievaluasi oleh Tim Operasional pada tahap konfirmasi harga akhir.
                  </span>
                </div>
              </div>
            </div>

            {submitError && (
              <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Summary Box & Submit */}
            <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                  Ringkasan Estimasi Biaya Sewa Dasar:
                </span>
                <div className="text-2xl font-black text-slate-950 font-mono mt-0.5">
                  Rp {estimatedCost.toLocaleString('id-ID')}
                  <span className="text-xs font-sans text-slate-600 font-normal">
                    {' '}({durationShift} Shift &bull; Inc. Operator &amp; BBM)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-800 mt-1">
                  <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Biaya Mob-Demob akan dihitung transparan saat konfirmasi ketersediaan.</span>
                </div>
              </div>

              <Button
                type="submit"
                size="xl"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-black gap-2 shadow-lg shadow-amber-500/20 shrink-0"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Menerbitkan Kode...' : 'Kirim Pengajuan Mandiri'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

