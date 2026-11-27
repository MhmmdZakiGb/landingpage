'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Phone,
  FileCheck,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchPengajuanStatus } from '@/lib/api';
import { getBookingByCode, getAllBookings } from '@/lib/storage/booking-store';
import { BookingSubmission, BookingStatus } from '@/lib/types/booking';

export function StatusPortalSection() {
  const [searchCode, setSearchCode] = useState<string>('');
  const [searchedBooking, setSearchedBooking] = useState<BookingSubmission | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [recentBookings, setRecentBookings] = useState<BookingSubmission[]>([]);

  useEffect(() => {
    // Initial fetch of recent demo bookings
    const all = getAllBookings();
    setRecentBookings(all.slice(0, 3));

    // Listen to custom event when user submits a new booking from the form
    const handleNewBooking = (e: any) => {
      if (e.detail) {
        setSearchCode(e.detail.bookingCode);
        setSearchedBooking(e.detail);
        setHasSearched(true);
        setRecentBookings(getAllBookings().slice(0, 3));
      }
    };

    window.addEventListener('gnp_booking_created', handleNewBooking);
    return () => window.removeEventListener('gnp_booking_created', handleNewBooking);
  }, []);

  const handleSearch = async (e?: React.FormEvent, customCode?: string) => {
    if (e) e.preventDefault();
    const codeToSearch = customCode || searchCode;
    if (!codeToSearch.trim()) return;

    setHasSearched(true);
    if (customCode) setSearchCode(customCode);

    try {
      const apiResult = await fetchPengajuanStatus(codeToSearch);
      setSearchedBooking(apiResult);
    } catch {
      const localResult = getBookingByCode(codeToSearch);
      setSearchedBooking(localResult || null);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Diajukan':
        return (
          <Badge className="bg-slate-100 text-slate-800 border-slate-300 font-bold gap-1 px-3 py-1">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            Diajukan (Menunggu Antrean)
          </Badge>
        );
      case 'Diperiksa':
        return (
          <Badge className="bg-blue-100 text-blue-900 border-blue-300 font-bold gap-1 px-3 py-1">
            <Clock className="h-3.5 w-3.5 text-blue-600 animate-spin" />
            Sedang Diperiksa Admin
          </Badge>
        );
      case 'Perlu Konfirmasi':
        return (
          <Badge className="bg-amber-100 text-amber-900 border-amber-300 font-bold gap-1 px-3 py-1">
            <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
            Perlu Konfirmasi Klien
          </Badge>
        );
      case 'Menunggu Approval':
        return (
          <Badge className="bg-purple-100 text-purple-900 border-purple-300 font-bold gap-1 px-3 py-1">
            <UserCheck className="h-3.5 w-3.5 text-purple-600" />
            Menunggu Persetujuan Manajemen
          </Badge>
        );
      case 'Disetujui':
        return (
          <Badge className="bg-emerald-500 text-white border-0 font-black gap-1 px-3 py-1 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Disetujui &bull; Siap Mobilisasi
          </Badge>
        );
      case 'Ditolak':
        return (
          <Badge className="bg-rose-500 text-white border-0 font-bold gap-1 px-3 py-1">
            <XCircle className="h-3.5 w-3.5" />
            Pengajuan Tidak Dapat Dipenuhi
          </Badge>
        );
      case 'Selesai':
        return (
          <Badge className="bg-emerald-700 text-white border-0 font-bold gap-1 px-3 py-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Sewa Selesai
          </Badge>
        );
      case 'Dibatalkan':
        return (
          <Badge className="bg-slate-500 text-white border-0 font-bold gap-1 px-3 py-1">
            <XCircle className="h-3.5 w-3.5" />
            Dibatalkan
          </Badge>
        );
    }
  };

  return (
    <section id="cek-status" className="relative bg-[#0f172a] text-white py-16 lg:py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-4xl h-72 bg-[#f59e0b]/10 blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
            <Search className="h-3.5 w-3.5" />
            Portal Mandiri Pelanggan
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl text-balance">
            Cek Status <span className="text-[#f59e0b]">Persetujuan Sewa</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base leading-relaxed">
            Pantau proses verifikasi jadwal armada dan penetapan biaya Mob-Demob secara real-time cukup dengan memasukkan <strong>Kode Pengajuan</strong> Anda.
          </p>

          {/* Search Box */}
          <form
            onSubmit={(e) => handleSearch(e)}
            className="mt-8 mx-auto max-w-xl flex flex-col sm:flex-row gap-2.5 rounded-2xl bg-slate-950 p-2.5 border border-slate-800 shadow-2xl"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Contoh: GNP-2025-88A12"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                className="w-full rounded-xl bg-transparent px-4 py-3 text-sm font-mono font-bold text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 gap-2"
            >
              <Search className="h-4 w-4" />
              Lacak Pengajuan
            </Button>
          </form>

          {/* Quick Demo Test Codes */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>Uji coba dengan kode demo:</span>
            {recentBookings.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleSearch(undefined, b.bookingCode)}
                className="rounded-lg bg-slate-800/90 hover:bg-slate-700 px-2.5 py-1 text-amber-400 font-mono font-bold transition-colors"
              >
                {b.bookingCode} ({b.status})
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        {hasSearched && (
          <div className="mt-12 mx-auto max-w-4xl">
            {searchedBooking ? (
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 shadow-2xl animate-fade-in">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Rincian Pengajuan Sewa:
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-0.5">
                      {searchedBooking.bookingCode}
                    </div>
                    <span className="text-xs text-slate-400">
                      Diajukan pada: {searchedBooking.createdAt}
                    </span>
                  </div>
                  <div>{getStatusBadge(searchedBooking.status)}</div>
                </div>

                {/* Status Timeline Bar */}
                <div className="py-7 border-b border-slate-800">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                    Tahapan Alur Pengajuan:
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-xl p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      <div className="font-bold">1. Form Diterima</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Data masuk antrean</div>
                    </div>

                    <div
                      className={`rounded-xl p-3 border ${searchedBooking.status === 'Diajukan'
                        ? 'bg-slate-900 border-slate-800 text-slate-500'
                        : 'bg-blue-950/60 border-blue-500/40 text-blue-300'
                        }`}
                    >
                      <div className="font-bold">2. Cek Jadwal Admin</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Verifikasi unit pool</div>
                    </div>

                    <div
                      className={`rounded-xl p-3 border ${searchedBooking.status === 'Disetujui'
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : searchedBooking.status === 'Ditolak'
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                    >
                      <div className="font-bold">3. Konfirmasi Manajemen</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {searchedBooking.status === 'Disetujui'
                          ? 'Telah Disetujui'
                          : searchedBooking.status === 'Ditolak'
                            ? 'Tidak Disetujui'
                            : 'Penetapan Mob-Demob'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm border-b border-slate-800">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Pemohon</span>
                    <p className="font-bold text-white mt-0.5">
                      {searchedBooking.clientName} ({searchedBooking.clientCompany})
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      WhatsApp: {searchedBooking.clientPhone}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Unit Alat Berat</span>
                    <p className="font-bold text-amber-400 mt-0.5">
                      {searchedBooking.unitName}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Kapasitas: {searchedBooking.unitCapacityTon} Ton &bull; Durasi: {searchedBooking.durationShift} Shift
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Lokasi Proyek</span>
                    <p className="font-bold text-white mt-0.5">
                      {searchedBooking.projectCity}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {searchedBooking.projectAddress}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Rincian Muatan</span>
                    <p className="font-bold text-white mt-0.5">
                      {searchedBooking.cargoDescription}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Estimasi Beban: {searchedBooking.cargoWeightTon || '-'} Ton
                    </p>
                  </div>

                  {searchedBooking.additionalNotes && (
                    <div className="sm:col-span-2 rounded-xl bg-slate-900 p-3.5 text-xs text-slate-300">
                      <strong className="text-amber-400 block mb-1">
                        Keterangan Teknis Tambahan Klien:
                      </strong>
                      {searchedBooking.additionalNotes}
                    </div>
                  )}
                </div>

                {/* Official Notes from Admin & Owner */}
                <div className="py-6 space-y-4 border-b border-slate-800">
                  {searchedBooking.adminNotes && (
                    <div className="rounded-2xl border border-blue-500/30 bg-blue-950/30 p-4 text-xs">
                      <span className="font-bold text-blue-400 block mb-1">
                        Catatan Operasional Admin GNP:
                      </span>
                      <p className="text-slate-300">{searchedBooking.adminNotes}</p>
                    </div>
                  )}

                  {searchedBooking.ownerNotes && (
                    <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs">
                      <span className="font-bold text-amber-400 block mb-1">
                        Persetujuan &amp; Catatan Manajemen GNP:
                      </span>
                      <p className="text-slate-200">{searchedBooking.ownerNotes}</p>
                    </div>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="mt-6 pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="space-y-1 text-xs">
                      <div className="text-slate-400 flex justify-between gap-4">
                        <span>Biaya Dasar Sewa ({searchedBooking.durationShift} Shift):</span>
                        <span className="font-mono text-white">
                          Rp {searchedBooking.baseRentalCost.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="text-slate-400 flex justify-between gap-4">
                        <span>Biaya Mobilisasi/Demobilisasi (Mob-Demob):</span>
                        <span className="font-mono text-amber-400 font-bold">
                          {searchedBooking.mobDemobCost > 0
                            ? `Rp ${searchedBooking.mobDemobCost.toLocaleString('id-ID')}`
                            : searchedBooking.status === 'Disetujui'
                              ? 'Gratis / Negosiasi'
                              : 'Menunggu Kalkulasi Tim'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 text-xl font-black text-amber-400 font-mono">
                      Total: Rp {searchedBooking.finalCost.toLocaleString('id-ID')}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                      `Halo GNP Heavy Equipment, saya menanyakan status pengajuan sewa ${searchedBooking.bookingCode} atas nama ${searchedBooking.clientName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black gap-2">
                      <Phone className="h-4 w-4" />
                      Chat Admin via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 text-center text-slate-400">
                <AlertCircle className="mx-auto h-10 w-10 text-amber-500 mb-3" />
                <h4 className="text-lg font-bold text-white">Kode Pengajuan Tidak Ditemukan</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Pastikan format kode sudah benar (contoh: <code>GNP-2025-XXXXX</code>).
                  Jika baru saja mengajukan, pastikan kode telah tersimpan.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

