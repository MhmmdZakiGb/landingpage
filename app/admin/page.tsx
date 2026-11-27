'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  CheckCircle2,
  Clock,
  XCircle,
  Truck,
  Calendar as CalendarIcon,
  ArrowLeft,
  Users,
  Building,
  RefreshCw,
  LogOut,
  Lock,
  ChevronRight,
  Package,
  TrendingUp,
  AlertTriangle,
  Phone,
  MapPin,
  Layers,
  BadgeCheck,
  Ban,
  Eye,
  EyeOff,
  LayoutDashboard,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useArmadaUnits } from '@/hooks/use-armada-units';
import {
  AuthUser,
  clearAuthSession,
  createJadwalApi,
  createPelangganApi,
  createUnitApi,
  deleteJadwalApi,
  deletePelangganApi,
  deleteUnitApi,
  fetchAllJadwalApi,
  fetchAllPelangganApi,
  fetchAllPengajuan,
  getAuthToken,
  getAuthUser,
  JadwalItem,
  loginAdmin,
  logoutAdmin,
  PelangganItem,
  submitOwnerApprovalApi,
  updatePelangganApi,
  updatePengajuanStatusApi,
  updateUnitApi,
} from '@/lib/api';
import { BookingSubmission, BookingStatus } from '@/lib/types/booking';

type ActiveRole = 'admin' | 'owner';
type BackendAdminStatus = 'diproses' | 'selesai' | 'dibatalkan';

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  Diajukan: {
    label: 'Baru Masuk',
    color: 'text-sky-800',
    bg: 'bg-sky-50 border-sky-200',
    dot: 'bg-sky-500',
  },
  Diperiksa: {
    label: 'Sedang Diproses',
    color: 'text-blue-800',
    bg: 'bg-blue-50 border-blue-200',
    dot: 'bg-blue-500',
  },
  'Perlu Konfirmasi': {
    label: 'Perlu Konfirmasi',
    color: 'text-orange-800',
    bg: 'bg-orange-50 border-orange-200',
    dot: 'bg-orange-500',
  },
  'Menunggu Approval': {
    label: 'Menunggu Approval',
    color: 'text-violet-800',
    bg: 'bg-violet-50 border-violet-200',
    dot: 'bg-violet-500',
  },
  Disetujui: {
    label: 'Disetujui',
    color: 'text-emerald-800',
    bg: 'bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  Ditolak: {
    label: 'Ditolak',
    color: 'text-red-800',
    bg: 'bg-red-50 border-red-200',
    dot: 'bg-red-500',
  },
  Selesai: {
    label: 'Selesai',
    color: 'text-teal-800',
    bg: 'bg-teal-50 border-teal-200',
    dot: 'bg-teal-500',
  },
  Dibatalkan: {
    label: 'Dibatalkan',
    color: 'text-slate-600',
    bg: 'bg-slate-50 border-slate-200',
    dot: 'bg-slate-400',
  },
};

function StatusPill({ status }: { status: BookingStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG['Diajukan'];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cfg.bg} ${cfg.color}`}
    >
      <span className={`h-2 w-2 rounded-full ${cfg.dot} shrink-0`} />
      {cfg.label}
    </span>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e8d8c8] bg-white p-4 shadow-sm flex items-center justify-between gap-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#534434]">
          {label}
        </p>
        <p className="mt-1 text-2xl font-black text-[#221a12]">{value}</p>
        <p className="mt-0.5 text-[11px] text-[#855300]">{sub}</p>
      </div>
      <div
        className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${accent}`}
      >
        {icon}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { units } = useArmadaUnits();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loginRoleTab, setLoginRoleTab] = useState<ActiveRole>('admin');
  const [loginEmail, setLoginEmail] = useState<string>('admin@gnp.co.id');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [currentRole, setCurrentRole] = useState<ActiveRole>('admin');
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingSubmission | null>(null);

  const [adminStatusInput, setAdminStatusInput] = useState<BackendAdminStatus>('diproses');
  const [adminNotesInput, setAdminNotesInput] = useState<string>('');
  const [ownerDecision, setOwnerDecision] = useState<'Disetujui' | 'Ditolak'>('Disetujui');
  const [mobDemobInput, setMobDemobInput] = useState<number>(750000);
  const [ownerNotesInput, setOwnerNotesInput] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'bookings' | 'calendar' | 'units' | 'customers'>('bookings');
  const [notificationMsg, setNotificationMsg] = useState<string>('');
  const [notifType, setNotifType] = useState<'success' | 'error'>('success');

  // ── State CRUD Unit, Pelanggan, Jadwal (Admin) ────────────────────────────
  const [pelangganList, setPelangganList] = useState<PelangganItem[]>([]);
  const [jadwalList, setJadwalList] = useState<JadwalItem[]>([]);

  const [unitFormOpen, setUnitFormOpen] = useState(false);
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [unitNama, setUnitNama] = useState('');
  const [unitJenis, setUnitJenis] = useState('Forklift');
  const [unitKapasitas, setUnitKapasitas] = useState('3');
  const [unitSumber, setUnitSumber] = useState<'GNP' | 'Rekanan'>('GNP');
  const [unitHarga, setUnitHarga] = useState('1200000');

  const [pelangganFormOpen, setPelangganFormOpen] = useState(false);
  const [editingPelangganId, setEditingPelangganId] = useState<number | null>(null);
  const [pelangganNama, setPelangganNama] = useState('');
  const [pelangganTelp, setPelangganTelp] = useState('');
  const [pelangganEmail, setPelangganEmail] = useState('');
  const [pelangganAlamat, setPelangganAlamat] = useState('');

  const [jadwalUnitId, setJadwalUnitId] = useState<string>('');
  const [jadwalMulai, setJadwalMulai] = useState('');
  const [jadwalSelesai, setJadwalSelesai] = useState('');

  const refreshData = async () => {
    if (!getAuthToken()) return;
    setIsLoadingBookings(true);
    try {
      const data = await fetchAllPengajuan();
      setBookings(data);
      if (currentRole === 'admin') {
        const [pData, jData] = await Promise.all([
          fetchAllPelangganApi().catch(() => []),
          fetchAllJadwalApi().catch(() => []),
        ]);
        setPelangganList(pData);
        setJadwalList(jData);
      }
      if (selectedBooking) {
        const updated = data.find((b) => b.id === selectedBooking.id);
        if (updated) setSelectedBooking(updated);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal memuat data pengajuan.';
      showNotification(msg, 'error');
    } finally {
      setIsLoadingBookings(false);
    }
  };

  useEffect(() => {
    const savedUser = getAuthUser();
    const savedToken = getAuthToken();
    if (savedUser && savedToken) {
      setAuthUser(savedUser);
      setCurrentRole(savedUser.role);
      refreshData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const { user } = await loginAdmin(loginEmail, loginPassword);
      setAuthUser(user);
      setCurrentRole(user.role);
      await refreshData();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Email atau password salah.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    clearAuthSession();
    setAuthUser(null);
    setBookings([]);
    setSelectedBooking(null);
  };

  const handleAdminUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    try {
      const res = await updatePengajuanStatusApi(selectedBooking.id, adminStatusInput);
      await refreshData();
      showNotification(`Status pengajuan ${res.bookingCode} berhasil diperbarui.`, 'success');
    } catch (err) {
      showNotification(err instanceof Error ? err.message : 'Gagal mengubah status.', 'error');
    }
  };

  const handleOwnerApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    try {
      await submitOwnerApprovalApi(
        selectedBooking.id,
        ownerDecision === 'Disetujui' ? 'disetujui' : 'ditolak',
        ownerNotesInput ||
          (ownerDecision === 'Disetujui'
            ? 'Disetujui oleh Owner GNP.'
            : 'Unit tidak dapat dimobilisasi.')
      );
      await refreshData();
      showNotification(`Keputusan untuk ${selectedBooking.bookingCode} berhasil disimpan.`, 'success');
    } catch (err) {
      showNotification(err instanceof Error ? err.message : 'Gagal menyimpan keputusan.', 'error');
    }
  };

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotifType(type);
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(''), 4500);
  };

  const statNew = bookings.filter((b) => b.status === 'Diajukan').length;
  const statProcess = bookings.filter(
    (b) => b.status === 'Diperiksa' || b.status === 'Menunggu Approval'
  ).length;
  const statApproved = bookings.filter((b) => b.status === 'Disetujui').length;
  const statDone = bookings.filter((b) => b.status === 'Selesai').length;

  // ── LOGIN SCREEN (Figma login_admin) ──────────────────────────────────────
  if (!authUser) {
    return (
      <div className="min-h-screen bg-[#fff8f4] flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Top Depot Indicator Bar */}
          <div className="mb-2.5 flex items-center justify-between px-1 text-xs">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[#221a12]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
              <span>DEPO KALIBANTENG &bull; SEMARANG BARAT</span>
            </div>
            <span className="text-[#534434] font-medium">Node: ID-SMG-01</span>
          </div>

          {/* Main Operational Card */}
          <div className="overflow-hidden rounded-2xl border border-[#e8d8c8] bg-white shadow-xl">
            {/* Top Safety Stripe */}
            <div className="h-2.5 w-full bg-gradient-to-r from-[#f59e0b] via-[#d97706] to-[#0f172a]" />

            <div className="p-7 sm:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="/images/logo-gnp.png"
                  alt="CV Giri Nusa Persada"
                  className="h-14 w-auto object-contain"
                />

                <div className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#fbebdd] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#534434]">
                  <Shield className="h-3.5 w-3.5 text-[#d97706]" />
                  PORTAL OPERASIONAL INTERNAL
                </div>

                <p className="mt-2.5 max-w-md text-xs leading-relaxed text-[#534434]">
                  Sistem Manajemen Armada, Penjadwalan, dan Otorisasi Sewa Alat Berat
                  CV Giri Nusa Persada
                </p>
              </div>

              {/* Role Selector */}
              <div>
                <label className="block text-xs font-bold text-[#534434] mb-1.5">
                  Pilih Mode Akses / Hak Akses:
                </label>
                <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#f5e6d7] p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRoleTab('admin');
                      setLoginEmail('admin@gnp.co.id');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-black transition ${
                      loginRoleTab === 'admin'
                        ? 'bg-[#f59e0b] text-[#221a12] shadow-sm'
                        : 'text-[#534434] hover:text-[#221a12]'
                    }`}
                  >
                    <Users className="h-3.5 w-3.5" />
                    Dispatcher / Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRoleTab('owner');
                      setLoginEmail('owner@gnp.co.id');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-black transition ${
                      loginRoleTab === 'owner'
                        ? 'bg-[#0f172a] text-white shadow-sm'
                        : 'text-[#534434] hover:text-[#221a12]'
                    }`}
                  >
                    <Shield className="h-3.5 w-3.5" />
                    Owner / Direksi
                  </button>
                </div>
              </div>

              {/* Notice Box */}
              <div className="flex items-start gap-2.5 rounded-xl border border-[#f5e6d7] bg-[#fff1e5] p-3.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]" />
                <div className="text-xs text-[#534434]">
                  <p className="font-bold text-[#221a12]">
                    Akses Terotentikasi &amp; Terpantau
                  </p>
                  <p className="mt-0.5 text-[11px]">
                    Depo Kalibanteng Semarang Barat &bull; Akses terbatas untuk staf
                    berwenang dan pemegang otorisasi SPK resmi.
                  </p>
                </div>
              </div>

              {loginError && (
                <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 font-medium">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#221a12] mb-1.5">
                    Email Operasional <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@gnp.co.id"
                    className="w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] px-4 py-3 text-sm text-[#221a12] placeholder-[#855300]/50 focus:border-[#f59e0b] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#221a12] mb-1.5">
                    Kata Sandi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Masukkan password"
                      className="w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] px-4 py-3 pr-11 text-sm text-[#221a12] placeholder-[#855300]/50 focus:border-[#f59e0b] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#534434] hover:text-[#221a12]"
                      aria-label="Toggle password"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full rounded-xl bg-[#f59e0b] py-3.5 text-sm font-black text-[#221a12] shadow-sm transition hover:bg-[#d97706] hover:text-white disabled:opacity-60"
                >
                  {isLoggingIn
                    ? 'Memverifikasi Kredensial...'
                    : 'Masuk Portal Operasional GNP'}
                </button>
              </form>

              {/* Footer Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f5e6d7] pt-4 text-[11px] text-[#534434]">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#d97706]" />
                  Terhubung ke Laravel Sanctum
                </span>
                <Link
                  href="/"
                  className="font-bold text-[#855300] hover:text-[#d97706] hover:underline"
                >
                  &larr; Kembali ke Website Publik
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = currentRole === 'owner';

  // ── DASHBOARD (Figma dasboard_admin) ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#221a12] flex flex-col lg:flex-row">
      {/* ── LEFT SIDEBAR (Desktop) ── */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:justify-between border-r border-[#e8d8c8] bg-white p-5 shrink-0">
        <div>
          <div className="pb-5 border-b border-[#f5e6d7]">
            <img
              src="/images/logo-gnp.png"
              alt="CV Giri Nusa Persada"
              className="h-10 w-auto object-contain"
            />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-[#fff1e5] px-3 py-2 text-[11px]">
            <span className="text-[#534434] font-medium">Unit Kerja</span>
            <span className="font-black text-[#855300]">KALIBANTENG</span>
          </div>

          <nav className="mt-5 space-y-1.5">
            {(
              [
                {
                  key: 'bookings',
                  label: 'Daftar Pengajuan',
                  icon: <LayoutDashboard className="h-4 w-4" />,
                  count: bookings.length,
                },
                {
                  key: 'calendar',
                  label: 'Jadwal & Kalender',
                  icon: <CalendarIcon className="h-4 w-4" />,
                  count: null,
                },
                {
                  key: 'units',
                  label: 'Kelola Armada Alat',
                  icon: <Truck className="h-4 w-4" />,
                  count: units.length,
                },
                ...(currentRole === 'admin'
                  ? [
                      {
                        key: 'customers' as const,
                        label: 'Data Pelanggan',
                        icon: <Users className="h-4 w-4" />,
                        count: pelangganList.length,
                      },
                    ]
                  : []),
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                  activeTab === item.key
                    ? 'bg-[#f59e0b] text-[#221a12] shadow-sm'
                    : 'text-[#534434] hover:bg-[#fff1e5] hover:text-[#221a12]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {item.icon}
                  {item.label}
                </span>
                {item.count !== null && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                      activeTab === item.key
                        ? 'bg-[#221a12] text-white'
                        : 'bg-[#fbebdd] text-[#855300]'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-[#f5e6d7] bg-[#fff1e5] p-3.5 text-[11px]">
            <p className="font-black text-[#221a12] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Depo Kalibanteng Siaga 24 Jam
            </p>
            <p className="mt-1 text-[#534434]">Sistem Terhubung &bull; Laravel API</p>
          </div>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#e8d8c8] bg-[#fff8f4] py-2.5 text-xs font-bold text-[#534434] hover:border-[#f59e0b] hover:text-[#221a12]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Lihat Website Publik
          </Link>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE ── */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 border-b border-[#e8d8c8] bg-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f59e0b] text-[#221a12]">
              <Truck className="h-4 w-4" />
            </span>
            <span className="text-sm font-black text-[#221a12]">GNP Internal</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-[#e8d8c8] px-2.5 py-1.5 text-xs font-bold text-[#534434]"
            >
              Web
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-[#0f172a] px-3 py-1.5 text-xs font-bold text-white"
            >
              Keluar
            </button>
          </div>
        </header>

        {/* Notification Toast */}
        {notificationMsg && (
          <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
            <div
              className={`flex items-start gap-3 rounded-2xl p-4 shadow-xl border bg-white ${
                notifType === 'success'
                  ? 'border-emerald-300 text-emerald-900'
                  : 'border-red-300 text-red-800'
              }`}
            >
              {notifType === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              )}
              <p className="text-xs font-bold leading-relaxed">{notificationMsg}</p>
            </div>
          </div>
        )}

        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top Context Strip (Figma) */}
          <div className="rounded-2xl border border-[#e8d8c8] bg-[#fff1e5] p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#855300]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                SISTEM KONTROL OPERASIONAL GNP
              </div>
              <h1 className="mt-1 text-xl font-black text-[#221a12] sm:text-2xl">
                Pusat Komando Depo Kalibanteng, Semarang
              </h1>
              <p className="mt-1 text-xs text-[#534434]">
                {isOwner
                  ? 'Mode Owner: Tetapkan biaya Mob-Demob dan berikan keputusan Approval akhir.'
                  : 'Mode Admin: Periksa jadwal armada, verifikasi pemohon, dan proses pengajuan.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-black ${
                  isOwner
                    ? 'bg-[#0f172a] text-white'
                    : 'bg-white border border-[#e8d8c8] text-[#221a12]'
                }`}
              >
                {isOwner ? (
                  <Shield className="h-3.5 w-3.5 text-[#f59e0b]" />
                ) : (
                  <Users className="h-3.5 w-3.5 text-[#d97706]" />
                )}
                {authUser.nama} ({isOwner ? 'Owner' : 'Admin'})
              </span>

              <button
                onClick={refreshData}
                disabled={isLoadingBookings}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#f59e0b] px-3.5 py-2 text-xs font-black text-[#221a12] shadow-sm hover:bg-[#d97706] hover:text-white disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isLoadingBookings ? 'animate-spin' : ''}`}
                />
                Refresh
              </button>

              <button
                onClick={handleLogout}
                className="hidden lg:inline-flex items-center gap-1.5 rounded-xl border border-[#d8c3ad] bg-white px-3.5 py-2 text-xs font-bold text-[#534434] hover:border-red-300 hover:text-red-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                Keluar
              </button>
            </div>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex gap-1.5 rounded-2xl border border-[#e8d8c8] bg-white p-1.5 lg:hidden">
            {(
              [
                { key: 'bookings', label: `Pengajuan (${bookings.length})` },
                { key: 'calendar', label: 'Kalender' },
                { key: 'units', label: 'Armada' },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex-1 rounded-xl py-2 text-xs font-bold ${
                  activeTab === t.key
                    ? 'bg-[#f59e0b] text-[#221a12]'
                    : 'text-[#534434]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Stat Cards */}
          {activeTab === 'bookings' && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <StatCard
                label="Pengajuan Baru"
                value={statNew}
                sub="Menunggu cek admin"
                icon={<Clock className="h-5 w-5 text-sky-700" />}
                accent="bg-sky-100"
              />
              <StatCard
                label="Sedang Diproses"
                value={statProcess}
                sub="Verifikasi jadwal"
                icon={<RefreshCw className="h-5 w-5 text-blue-700" />}
                accent="bg-blue-100"
              />
              <StatCard
                label="Disetujui"
                value={statApproved}
                sub="Siap mobilisasi"
                icon={<BadgeCheck className="h-5 w-5 text-emerald-700" />}
                accent="bg-emerald-100"
              />
              <StatCard
                label="Selesai"
                value={statDone}
                sub="Proyek tuntas"
                icon={<TrendingUp className="h-5 w-5 text-[#855300]" />}
                accent="bg-[#fff1e5]"
              />
            </div>
          )}

          {/* ════════ TAB 1: DAFTAR PENGAJUAN ════════ */}
          {activeTab === 'bookings' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* List */}
              <div className="lg:col-span-5 rounded-2xl border border-[#e8d8c8] bg-white shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-[#f5e6d7]">
                  <h2 className="text-sm font-black text-[#221a12]">
                    Antrean Pengajuan Masuk
                  </h2>
                  <p className="text-xs text-[#534434] mt-0.5">
                    Klik salah satu pengajuan untuk memproses
                  </p>
                </div>

                {bookings.length === 0 ? (
                  <div className="p-10 text-center text-[#534434]">
                    <Package className="mx-auto h-10 w-10 text-[#d8c3ad] mb-3" />
                    <p className="text-xs font-bold">Belum ada pengajuan masuk</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#f5e6d7] max-h-[620px] overflow-y-auto">
                    {bookings.map((booking) => {
                      const isSelected = selectedBooking?.id === booking.id;
                      return (
                        <div
                          key={booking.id}
                          onClick={() => {
                            setSelectedBooking(booking);
                            const mappedStatus: BackendAdminStatus =
                              booking.status === 'Selesai'
                                ? 'selesai'
                                : booking.status === 'Dibatalkan'
                                  ? 'dibatalkan'
                                  : 'diproses';
                            setAdminStatusInput(mappedStatus);
                            setAdminNotesInput(booking.adminNotes || '');
                            setOwnerNotesInput(booking.ownerNotes || '');
                            setMobDemobInput(booking.mobDemobCost || 750000);
                          }}
                          className={`px-5 py-4 cursor-pointer transition-all border-l-4 ${
                            isSelected
                              ? 'bg-[#fff1e5] border-l-[#f59e0b]'
                              : 'border-l-transparent hover:bg-[#fff8f4]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-mono text-xs font-black text-[#855300]">
                                {booking.bookingCode}
                              </p>
                              <p className="mt-0.5 text-sm font-black text-[#221a12] truncate">
                                {booking.clientName}
                              </p>
                              <p className="text-xs text-[#534434] truncate">
                                {booking.clientCompany}
                              </p>
                            </div>
                            <StatusPill status={booking.status} />
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                            <span className="flex items-center gap-1.5 font-bold text-[#d97706] truncate">
                              <Truck className="h-3.5 w-3.5 shrink-0" />
                              {booking.unitName}
                            </span>
                            <span className="font-mono font-black text-[#221a12] shrink-0">
                              Rp {booking.finalCost.toLocaleString('id-ID')}
                            </span>
                          </div>

                          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#534434]">
                            <MapPin className="h-3 w-3 shrink-0 text-[#855300]" />
                            <span className="truncate">{booking.projectCity}</span>
                            <span>&bull;</span>
                            <span>{booking.startDate}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Detail & Action */}
              <div className="lg:col-span-7">
                {selectedBooking ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-[#e8d8c8] bg-white shadow-sm overflow-hidden">
                      <div className="bg-[#fff1e5] border-b border-[#e8d8c8] px-6 py-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#855300]">
                            Detail Pengajuan
                          </p>
                          <h3 className="text-xl font-black font-mono text-[#221a12]">
                            {selectedBooking.bookingCode}
                          </h3>
                        </div>
                        <StatusPill status={selectedBooking.status} />
                      </div>

                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs">
                          <InfoRow
                            icon={<Users className="h-3.5 w-3.5" />}
                            label="Nama Pemohon"
                            value={selectedBooking.clientName}
                          />
                          <InfoRow
                            icon={<Building className="h-3.5 w-3.5" />}
                            label="Perusahaan"
                            value={selectedBooking.clientCompany}
                          />
                          <InfoRow
                            icon={<Phone className="h-3.5 w-3.5" />}
                            label="WhatsApp"
                            value={selectedBooking.clientPhone}
                          />
                          <InfoRow
                            icon={<CalendarIcon className="h-3.5 w-3.5" />}
                            label="Tanggal Rencana"
                            value={selectedBooking.startDate}
                          />
                          <div className="col-span-2">
                            <InfoRow
                              icon={<MapPin className="h-3.5 w-3.5" />}
                              label="Alamat Proyek"
                              value={`${selectedBooking.projectCity} — ${selectedBooking.projectAddress}`}
                            />
                          </div>
                          <div className="col-span-2">
                            <InfoRow
                              icon={<Truck className="h-3.5 w-3.5" />}
                              label="Unit yang Diminta"
                              value={`${selectedBooking.unitName} · ${selectedBooking.durationShift} Shift`}
                              highlight
                            />
                          </div>
                          <div className="col-span-2">
                            <InfoRow
                              icon={<Layers className="h-3.5 w-3.5" />}
                              label="Muatan & Beban"
                              value={`${selectedBooking.cargoDescription} (${
                                selectedBooking.cargoWeightTon || '-'
                              } Ton)`}
                            />
                          </div>
                        </div>

                        {selectedBooking.additionalNotes && (
                          <div className="mt-4 rounded-xl border border-[#f5e6d7] bg-[#fff8f4] px-4 py-3">
                            <p className="text-[10px] font-black uppercase tracking-wider text-[#855300]">
                              Catatan Teknis Klien
                            </p>
                            <p className="mt-1 text-xs text-[#221a12]">
                              {selectedBooking.additionalNotes}
                            </p>
                          </div>
                        )}

                        <div className="mt-5 rounded-xl border border-[#f5e6d7] bg-[#fff8f4] px-4 py-3 space-y-2 text-xs">
                          <div className="flex justify-between text-[#534434]">
                            <span>Biaya Sewa ({selectedBooking.durationShift} Shift)</span>
                            <span className="font-mono font-bold text-[#221a12]">
                              Rp {selectedBooking.baseRentalCost.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="flex justify-between text-[#534434]">
                            <span>Biaya Mob-Demob</span>
                            <span className="font-mono font-bold text-[#d97706]">
                              Rp {selectedBooking.mobDemobCost.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="pt-2 border-t border-[#e8d8c8] flex justify-between font-black text-sm text-[#221a12]">
                            <span>Total Final</span>
                            <span className="font-mono text-[#d97706]">
                              Rp {selectedBooking.finalCost.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Card */}
                    <div className="rounded-2xl border border-[#e8d8c8] bg-white shadow-sm overflow-hidden">
                      <div className="bg-[#0f172a] px-6 py-4 text-white">
                        <h4 className="text-sm font-black flex items-center gap-2">
                          {isOwner ? (
                            <Shield className="h-4 w-4 text-[#f59e0b]" />
                          ) : (
                            <Users className="h-4 w-4 text-[#f59e0b]" />
                          )}
                          {isOwner
                            ? 'Keputusan Owner — Approval Akhir'
                            : 'Aksi Admin — Verifikasi & Update Status'}
                        </h4>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          {isOwner
                            ? 'Setujui atau tolak pengajuan ini. Keputusan langsung tampil di portal klien.'
                            : 'Ubah status pengajuan setelah memeriksa ketersediaan armada di kalender.'}
                        </p>
                      </div>

                      <div className="p-6">
                        {currentRole === 'admin' ? (
                          <form onSubmit={handleAdminUpdate} className="space-y-4">
                            <div className="grid gap-2">
                              {(
                                [
                                  {
                                    val: 'diproses',
                                    label: 'Sedang Diproses',
                                    desc: 'Admin sedang cek armada & verifikasi data',
                                  },
                                  {
                                    val: 'selesai',
                                    label: 'Selesai',
                                    desc: 'Proyek telah selesai dijalankan',
                                  },
                                  {
                                    val: 'dibatalkan',
                                    label: 'Dibatalkan',
                                    desc: 'Pengajuan dibatalkan / tidak dilanjutkan',
                                  },
                                ] as const
                              ).map((opt) => (
                                <label
                                  key={opt.val}
                                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                                    adminStatusInput === opt.val
                                      ? 'border-[#f59e0b] bg-[#fff1e5]'
                                      : 'border-[#e8d8c8] hover:bg-[#fff8f4]'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="adminStatus"
                                    value={opt.val}
                                    checked={adminStatusInput === opt.val}
                                    onChange={() => setAdminStatusInput(opt.val)}
                                    className="accent-[#f59e0b]"
                                  />
                                  <div>
                                    <p className="text-xs font-black text-[#221a12]">
                                      {opt.label}
                                    </p>
                                    <p className="text-[11px] text-[#534434]">{opt.desc}</p>
                                  </div>
                                </label>
                              ))}
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-[#221a12] mb-1.5">
                                Catatan Admin (opsional)
                              </label>
                              <textarea
                                rows={3}
                                value={adminNotesInput}
                                onChange={(e) => setAdminNotesInput(e.target.value)}
                                placeholder="Contoh: Unit Forklift 5T ready di pool Semarang."
                                className="w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] p-3 text-xs text-[#221a12] focus:border-[#f59e0b] focus:bg-white focus:outline-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full rounded-xl bg-[#f59e0b] py-3 text-xs font-black text-[#221a12] shadow-sm transition hover:bg-[#d97706] hover:text-white"
                            >
                              Simpan Perubahan Status
                            </button>
                          </form>
                        ) : (
                          <form onSubmit={handleOwnerApproval} className="space-y-4">
                            <div className="grid grid-cols-2 gap-2.5">
                              <button
                                type="button"
                                onClick={() => setOwnerDecision('Disetujui')}
                                className={`py-3 rounded-xl border-2 text-xs font-black transition ${
                                  ownerDecision === 'Disetujui'
                                    ? 'border-emerald-600 bg-emerald-600 text-white'
                                    : 'border-[#e8d8c8] bg-white text-[#534434]'
                                }`}
                              >
                                Setujui (Approve)
                              </button>
                              <button
                                type="button"
                                onClick={() => setOwnerDecision('Ditolak')}
                                className={`py-3 rounded-xl border-2 text-xs font-black transition ${
                                  ownerDecision === 'Ditolak'
                                    ? 'border-red-600 bg-red-600 text-white'
                                    : 'border-[#e8d8c8] bg-white text-[#534434]'
                                }`}
                              >
                                Tolak (Reject)
                              </button>
                            </div>

                            {ownerDecision === 'Disetujui' && (
                              <div>
                                <label className="block text-xs font-bold text-[#221a12] mb-1.5">
                                  Biaya Mob-Demob (Rp)
                                </label>
                                <input
                                  type="number"
                                  step="50000"
                                  value={mobDemobInput}
                                  onChange={(e) =>
                                    setMobDemobInput(parseInt(e.target.value) || 0)
                                  }
                                  className="w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] p-3 text-xs font-mono font-bold text-[#221a12] focus:border-[#f59e0b] focus:bg-white focus:outline-none"
                                />
                              </div>
                            )}

                            <div>
                              <label className="block text-xs font-bold text-[#221a12] mb-1.5">
                                Instruksi / Catatan Resmi Owner
                              </label>
                              <textarea
                                rows={3}
                                value={ownerNotesInput}
                                onChange={(e) => setOwnerNotesInput(e.target.value)}
                                placeholder="Contoh: Disetujui. Silakan hubungi admin untuk SPK."
                                className="w-full rounded-xl border border-[#e8d8c8] bg-[#fff8f4] p-3 text-xs text-[#221a12] focus:border-[#f59e0b] focus:bg-white focus:outline-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className={`w-full rounded-xl py-3 text-xs font-black text-white shadow-sm transition ${
                                ownerDecision === 'Disetujui'
                                  ? 'bg-emerald-600 hover:bg-emerald-700'
                                  : 'bg-red-600 hover:bg-red-700'
                              }`}
                            >
                              {ownerDecision === 'Disetujui'
                                ? 'Setujui & Publikasikan ke Klien'
                                : 'Tolak & Publikasikan ke Klien'}
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#d8c3ad] bg-white p-12 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1e5]">
                      <ChevronRight className="h-6 w-6 text-[#d97706]" />
                    </div>
                    <p className="text-sm font-black text-[#221a12]">
                      Pilih pengajuan di sebelah kiri
                    </p>
                    <p className="mt-1 text-xs text-[#534434]">
                      Detail pemohon dan tombol aksi akan muncul di sini
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ════════ TAB 2: KALENDER ════════ */}
          {activeTab === 'calendar' && (
            <div className="rounded-2xl border border-[#e8d8c8] bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#f5e6d7]">
                <h3 className="text-base font-black text-[#221a12] flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-[#d97706]" />
                  Kalender Ketersediaan Armada GNP
                </h3>
                <p className="text-xs text-[#534434] mt-0.5">
                  Pantau unit yang sedang aktif di proyek vs unit ready di Depo
                  Kalibanteng.
                </p>
              </div>

              {currentRole === 'admin' && (
                <div className="px-6 py-4 bg-[#fff8f4] border-b border-[#f5e6d7]">
                  <p className="text-xs font-black text-[#221a12] mb-3">
                    Tambah Jadwal Penggunaan Unit
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <select
                      value={jadwalUnitId}
                      onChange={(e) => setJadwalUnitId(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    >
                      <option value="">-- Pilih Unit --</option>
                      {units.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={jadwalMulai}
                      onChange={(e) => setJadwalMulai(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <input
                      type="date"
                      value={jadwalSelesai}
                      onChange={(e) => setJadwalSelesai(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        if (!jadwalUnitId || !jadwalMulai || !jadwalSelesai) {
                          setNotifType('error');
                          setNotificationMsg('Lengkapi unit dan tanggal jadwal.');
                          return;
                        }
                        try {
                          await createJadwalApi({
                            id_unit: Number(jadwalUnitId),
                            tanggal_mulai: jadwalMulai,
                            tanggal_selesai: jadwalSelesai,
                            status: 'Digunakan',
                          });
                          setNotifType('success');
                          setNotificationMsg('Jadwal berhasil ditambahkan.');
                          setJadwalMulai('');
                          setJadwalSelesai('');
                          await refreshData();
                        } catch (err) {
                          setNotifType('error');
                          setNotificationMsg(
                            err instanceof Error ? err.message : 'Gagal menambah jadwal (cek bentrok).'
                          );
                        }
                      }}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#f59e0b] px-4 py-2 text-xs font-black text-[#221a12] hover:bg-[#d97706] hover:text-white transition"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Simpan Jadwal
                    </button>
                  </div>

                  {jadwalList.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {jadwalList.map((j) => (
                        <div
                          key={j.id_jadwal}
                          className="flex items-center justify-between rounded-xl border border-[#e8d8c8] bg-white px-4 py-2.5 text-xs"
                        >
                          <div>
                            <span className="font-bold text-[#221a12]">
                              {j.unit?.nama_unit ?? `Unit #${j.id_unit}`}
                            </span>{' '}
                            <span className="text-[#534434]">
                              ({j.tanggal_mulai} s/d {j.tanggal_selesai}) — {j.status}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                await deleteJadwalApi(j.id_jadwal);
                                setNotifType('success');
                                setNotificationMsg('Jadwal berhasil dihapus.');
                                await refreshData();
                              } catch (err) {
                                setNotifType('error');
                                setNotificationMsg(
                                  err instanceof Error ? err.message : 'Gagal menghapus jadwal.'
                                );
                              }
                            }}
                            className="text-rose-600 hover:text-rose-800 p-1"
                            title="Hapus jadwal"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {units
                  .filter((u) => u.source === 'Milik GNP')
                  .map((unit) => {
                    const activeBookings = bookings.filter(
                      (b) => b.unitId === unit.id && b.status === 'Disetujui'
                    );
                    const isBusy = activeBookings.length > 0;

                    return (
                      <div
                        key={unit.id}
                        className={`rounded-xl border p-4 flex items-center justify-between gap-4 ${
                          isBusy
                            ? 'bg-[#fff1e5] border-[#f59e0b]'
                            : 'bg-emerald-50/70 border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-xs ${
                              isBusy
                                ? 'bg-[#f59e0b] text-[#221a12]'
                                : 'bg-emerald-200 text-emerald-900'
                            }`}
                          >
                            {unit.capacityTon}T
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-[#221a12]">
                              {unit.name}
                            </h4>
                            <p className="text-[11px] text-[#534434]">
                              Rp {unit.basePricePerShift.toLocaleString('id-ID')}/shift
                            </p>
                          </div>
                        </div>

                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            isBusy
                              ? 'bg-[#f59e0b]/20 text-[#855300]'
                              : 'bg-emerald-200 text-emerald-900'
                          }`}
                        >
                          {isBusy
                            ? `${activeBookings.length} Proyek Aktif`
                            : 'Ready di Pool'}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ════════ TAB 3: DATA ARMADA ════════ */}
          {activeTab === 'units' && (
            <div className="rounded-2xl border border-[#e8d8c8] bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#f5e6d7] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-[#221a12] flex items-center gap-2">
                    <Building className="h-5 w-5 text-[#d97706]" />
                    Database Armada &amp; Rekanan Internal
                  </h3>
                  <p className="text-xs text-[#534434] mt-0.5">
                    Nama mitra rekanan dirahasiakan di halaman publik, namun dicatat
                    lengkap di sini untuk operasional.
                  </p>
                </div>
                {currentRole === 'admin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingUnitId(null);
                      setUnitNama('');
                      setUnitJenis('Forklift');
                      setUnitKapasitas('3');
                      setUnitSumber('GNP');
                      setUnitHarga('1200000');
                      setUnitFormOpen((v) => !v);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#f59e0b] px-4 py-2 text-xs font-black text-[#221a12] hover:bg-[#d97706] hover:text-white transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Tambah Unit
                  </button>
                )}
              </div>

              {currentRole === 'admin' && unitFormOpen && (
                <div className="px-6 py-4 bg-[#fff8f4] border-b border-[#f5e6d7]">
                  <p className="text-xs font-black text-[#221a12] mb-3">
                    {editingUnitId ? 'Ubah Data Unit' : 'Tambah Unit Baru'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Unit (mis. Forklift Toyota 3T)"
                      value={unitNama}
                      onChange={(e) => setUnitNama(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <input
                      type="text"
                      placeholder="Jenis (Forklift / Crane / Excavator)"
                      value={unitJenis}
                      onChange={(e) => setUnitJenis(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <input
                      type="number"
                      placeholder="Kapasitas (Ton)"
                      value={unitKapasitas}
                      onChange={(e) => setUnitKapasitas(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <select
                      value={unitSumber}
                      onChange={(e) => setUnitSumber(e.target.value as 'GNP' | 'Rekanan')}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    >
                      <option value="GNP">Milik GNP</option>
                      <option value="Rekanan">Rekanan</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Tarif / Shift (Rp)"
                      value={unitHarga}
                      onChange={(e) => setUnitHarga(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          if (!unitNama.trim()) {
                            setNotifType('error');
                            setNotificationMsg('Nama unit wajib diisi.');
                            return;
                          }
                          try {
                            const payload = {
                              nama_unit: unitNama,
                              jenis_unit: unitJenis,
                              kapasitas: Number(unitKapasitas),
                              sumber_unit: unitSumber,
                              harga_sewa: Number(unitHarga),
                            };
                            if (editingUnitId) {
                              await updateUnitApi(editingUnitId, payload);
                              setNotificationMsg('Data unit berhasil diperbarui.');
                            } else {
                              await createUnitApi(payload);
                              setNotificationMsg('Unit baru berhasil ditambahkan.');
                            }
                            setNotifType('success');
                            setUnitFormOpen(false);
                            window.location.reload();
                          } catch (err) {
                            setNotifType('error');
                            setNotificationMsg(
                              err instanceof Error ? err.message : 'Gagal menyimpan data unit.'
                            );
                          }
                        }}
                        className="flex-1 rounded-xl bg-[#f59e0b] px-4 py-2 text-xs font-black text-[#221a12] hover:bg-[#d97706] hover:text-white transition"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnitFormOpen(false)}
                        className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs font-bold text-[#534434]"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {units.map((unit) => (
                  <div
                    key={unit.id}
                    className="rounded-xl border border-[#e8d8c8] bg-[#fff8f4] p-4 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h4 className="text-sm font-black text-[#221a12]">
                          {unit.name}
                        </h4>
                        <span
                          className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${
                            unit.source === 'Milik GNP'
                              ? 'bg-[#f59e0b] text-[#221a12]'
                              : 'bg-[#0f172a] text-white'
                          }`}
                        >
                          {unit.source === 'Milik GNP' ? 'GNP' : 'Rekanan'}
                        </span>
                      </div>

                      <div className="text-xs text-[#534434] space-y-1">
                        <p>
                          Kapasitas:{' '}
                          <strong className="text-[#221a12]">
                            {unit.capacityTon} Ton
                          </strong>
                        </p>
                        <p>
                          Kategori:{' '}
                          <strong className="text-[#221a12]">{unit.category}</strong>
                        </p>
                      </div>

                      {unit.partnerNameInternal && (
                        <div className="mt-3 rounded-lg bg-[#fff1e5] border border-[#f5e6d7] px-3 py-2">
                          <p className="text-[10px] font-bold text-[#855300] uppercase">
                            Mitra Internal
                          </p>
                          <p className="text-xs font-mono font-bold text-[#221a12]">
                            {unit.partnerNameInternal}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#e8d8c8] text-xs">
                      <span className="text-[#534434]">Tarif / Shift</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-[#221a12]">
                          Rp {unit.basePricePerShift.toLocaleString('id-ID')}
                        </span>
                        {currentRole === 'admin' && (
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingUnitId(unit.id);
                                setUnitNama(unit.name);
                                setUnitJenis(unit.category);
                                setUnitKapasitas(String(unit.capacityTon));
                                setUnitSumber(unit.source === 'Milik GNP' ? 'GNP' : 'Rekanan');
                                setUnitHarga(String(unit.basePricePerShift));
                                setUnitFormOpen(true);
                              }}
                              className="p-1 text-[#855300] hover:text-[#221a12]"
                              title="Ubah unit"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await deleteUnitApi(unit.id);
                                  setNotifType('success');
                                  setNotificationMsg('Unit berhasil dihapus.');
                                  window.location.reload();
                                } catch (err) {
                                  setNotifType('error');
                                  setNotificationMsg(
                                    err instanceof Error ? err.message : 'Gagal menghapus unit.'
                                  );
                                }
                              }}
                              className="p-1 text-rose-600 hover:text-rose-800"
                              title="Hapus unit"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ TAB 4: DATA PELANGGAN (ADMIN) ════════ */}
          {activeTab === 'customers' && currentRole === 'admin' && (
            <div className="rounded-2xl border border-[#e8d8c8] bg-white shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#f5e6d7] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-[#221a12] flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#d97706]" />
                    Data Pelanggan
                  </h3>
                  <p className="text-xs text-[#534434] mt-0.5">
                    Kelola daftar pelanggan penyewa alat berat GNP.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPelangganId(null);
                    setPelangganNama('');
                    setPelangganTelp('');
                    setPelangganEmail('');
                    setPelangganAlamat('');
                    setPelangganFormOpen((v) => !v);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#f59e0b] px-4 py-2 text-xs font-black text-[#221a12] hover:bg-[#d97706] hover:text-white transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Tambah Pelanggan
                </button>
              </div>

              {pelangganFormOpen && (
                <div className="px-6 py-4 bg-[#fff8f4] border-b border-[#f5e6d7]">
                  <p className="text-xs font-black text-[#221a12] mb-3">
                    {editingPelangganId ? 'Ubah Data Pelanggan' : 'Tambah Pelanggan Baru'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nama Pelanggan / Perusahaan"
                      value={pelangganNama}
                      onChange={(e) => setPelangganNama(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <input
                      type="text"
                      placeholder="Nomor Telepon / WA"
                      value={pelangganTelp}
                      onChange={(e) => setPelangganTelp(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <input
                      type="email"
                      placeholder="Email (opsional)"
                      value={pelangganEmail}
                      onChange={(e) => setPelangganEmail(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                    <input
                      type="text"
                      placeholder="Alamat (opsional)"
                      value={pelangganAlamat}
                      onChange={(e) => setPelangganAlamat(e.target.value)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs text-[#221a12]"
                    />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        if (!pelangganNama.trim() || !pelangganTelp.trim()) {
                          setNotifType('error');
                          setNotificationMsg('Nama dan nomor telepon wajib diisi.');
                          return;
                        }
                        try {
                          const payload = {
                            nama: pelangganNama,
                            nomor_telepon: pelangganTelp,
                            email: pelangganEmail || null,
                            alamat: pelangganAlamat || null,
                          };
                          if (editingPelangganId) {
                            await updatePelangganApi(editingPelangganId, payload);
                            setNotificationMsg('Data pelanggan berhasil diperbarui.');
                          } else {
                            await createPelangganApi(payload);
                            setNotificationMsg('Pelanggan baru berhasil ditambahkan.');
                          }
                          setNotifType('success');
                          setPelangganFormOpen(false);
                          await refreshData();
                        } catch (err) {
                          setNotifType('error');
                          setNotificationMsg(
                            err instanceof Error ? err.message : 'Gagal menyimpan data pelanggan.'
                          );
                        }
                      }}
                      className="rounded-xl bg-[#f59e0b] px-4 py-2 text-xs font-black text-[#221a12] hover:bg-[#d97706] hover:text-white transition"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => setPelangganFormOpen(false)}
                      className="rounded-xl border border-[#e8d8c8] bg-white px-3 py-2 text-xs font-bold text-[#534434]"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-2.5">
                {pelangganList.length === 0 ? (
                  <p className="text-xs text-[#534434]">Belum ada data pelanggan.</p>
                ) : (
                  pelangganList.map((p) => (
                    <div
                      key={p.id_pelanggan}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e8d8c8] bg-[#fff8f4] px-4 py-3 text-xs"
                    >
                      <div>
                        <p className="font-black text-[#221a12]">{p.nama}</p>
                        <p className="text-[#534434]">
                          {p.nomor_telepon}
                          {p.email ? ` • ${p.email}` : ''}
                          {p.alamat ? ` • ${p.alamat}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPelangganId(p.id_pelanggan);
                            setPelangganNama(p.nama);
                            setPelangganTelp(p.nomor_telepon);
                            setPelangganEmail(p.email ?? '');
                            setPelangganAlamat(p.alamat ?? '');
                            setPelangganFormOpen(true);
                          }}
                          className="p-1.5 text-[#855300] hover:text-[#221a12]"
                          title="Ubah pelanggan"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await deletePelangganApi(p.id_pelanggan);
                              setNotifType('success');
                              setNotificationMsg('Pelanggan berhasil dihapus.');
                              await refreshData();
                            } catch (err) {
                              setNotifType('error');
                              setNotificationMsg(
                                err instanceof Error ? err.message : 'Gagal menghapus pelanggan.'
                              );
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800"
                          title="Hapus pelanggan"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[#855300] mb-0.5">
        {icon}
        <span className="text-[11px] font-bold uppercase tracking-wide">{label}</span>
      </div>
      <p
        className={`font-bold text-sm ${
          highlight ? 'text-[#d97706]' : 'text-[#221a12]'
        }`}
      >
        {value}
      </p>
    </div>
  );
}
