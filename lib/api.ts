import { BookingStatus, BookingSubmission, HeavyEquipmentUnit, UnitSource } from './types/booking';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://127.0.0.1:8000/api';

const TOKEN_KEY = 'gnp_auth_token';
const USER_KEY = 'gnp_auth_user';

export interface AuthUser {
  id_user: number;
  nama: string;
  email: string;
  role: 'admin' | 'owner';
}

export interface ApiUnit {
  id_unit: number;
  id_rekanan: number | null;
  nama_unit: string;
  jenis_unit: string;
  kapasitas: number | string;
  spesifikasi: string | null;
  lokasi_unit: string | null;
  sumber_unit: string;
  harga_sewa: number | string;
  status: string;
  rekanan?: {
    id_rekanan: number;
    nama_rekanan: string;
  } | null;
}

export interface ApiPengajuan {
  id_pengajuan: number;
  kode_pengajuan: string;
  id_pelanggan?: number;
  id_unit?: number;
  tanggal_pengajuan: string | null;
  tanggal_mulai: string | null;
  tanggal_selesai: string | null;
  lokasi_proyek: string;
  keterangan?: string | null;
  estimasi_harga: number | string;
  status: 'menunggu' | 'diproses' | 'disetujui' | 'ditolak' | 'selesai' | 'dibatalkan';
  pelanggan?: {
    id_pelanggan: number;
    nama: string;
    nomor_telepon: string;
    email?: string | null;
    alamat: string;
  } | null;
  unit?: ApiUnit | null;
  approval?: {
    id_approval: number;
    keputusan: 'disetujui' | 'ditolak';
    catatan?: string | null;
    tanggal?: string | null;
  } | null;
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthSession(token: string, user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    const validationErrors = json.errors
      ? Object.values(json.errors).flat().join(' ')
      : '';
    throw new Error(validationErrors || json.message || `Request gagal (${res.status})`);
  }

  return json.data as T;
}

function getDefaultImage(category: HeavyEquipmentUnit['category']): string {
  switch (category) {
    case 'Mobile Crane':
      return 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80';
    case 'Excavator':
      return 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?auto=format&fit=crop&w=900&q=80';
    default:
      return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80';
  }
}

function mapCategory(jenisUnit: string): HeavyEquipmentUnit['category'] {
  const lower = jenis_unitNormalize(jenisUnit);
  if (lower.includes('crane')) return 'Mobile Crane';
  if (lower.includes('excavator')) return 'Excavator';
  return 'Forklift';
}

function jenis_unitNormalize(val: string): string {
  return (val || '').trim().toLowerCase();
}

function mapSource(sumberUnit: string): UnitSource {
  const lower = (sumberUnit || '').trim().toLowerCase();
  return lower === 'rekanan' || lower.includes('rekanan') ? 'Unit Rekanan' : 'Milik GNP';
}

export function mapBackendStatus(status: ApiPengajuan['status']): BookingStatus {
  switch (status) {
    case 'menunggu':
      return 'Diajukan';
    case 'diproses':
      return 'Diperiksa';
    case 'disetujui':
      return 'Disetujui';
    case 'ditolak':
      return 'Ditolak';
    case 'selesai':
      return 'Selesai';
    case 'dibatalkan':
      return 'Dibatalkan';
    default:
      return 'Diajukan';
  }
}

export function mapUnitFromApi(unit: ApiUnit): HeavyEquipmentUnit {
  const category = mapCategory(unit.jenis_unit);
  const source = mapSource(unit.sumber_unit);
  const specs = unit.spesifikasi
    ? unit.spesifikasi
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : ['Unit siap operasional'];

  return {
    id: String(unit.id_unit),
    name: unit.nama_unit,
    category,
    capacityTon: Number(unit.kapasitas) || 0,
    source,
    partnerNameInternal: unit.rekanan?.nama_rekanan,
    image: getDefaultImage(category),
    specs,
    features: [
      unit.lokasi_unit ? `Lokasi: ${unit.lokasi_unit}` : 'Siap Mobilisasi Jateng & DIY',
      'Include Operator Berpengalaman',
      source === 'Milik GNP' ? 'Unit Pool Sendiri GNP' : 'Unit Mitra Terverifikasi',
    ],
    isAvailable: unit.status === 'tersedia',
    basePricePerShift: Number(unit.harga_sewa) || 0,
  };
}

function computeDurationShift(startDate: string | null, endDate: string | null): number {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, diffDays);
}

export function mapPengajuanFromApi(p: ApiPengajuan): BookingSubmission {
  const startDate = p.tanggal_mulai || new Date().toISOString().split('T')[0];
  const durationShift = computeDurationShift(p.tanggal_mulai, p.tanggal_selesai);
  const estimasi = Number(p.estimasi_harga) || 0;
  const unitName = p.unit
    ? p.unit.sumber_unit?.toLowerCase() === 'rekanan'
      ? `${p.unit.nama_unit} (Sumber: Unit Rekanan)`
      : p.unit.nama_unit
    : `Unit #${p.id_unit ?? '-'}`;

  return {
    id: String(p.id_pengajuan ?? p.kode_pengajuan),
    bookingCode: p.kode_pengajuan,
    clientName: p.pelanggan?.nama || 'Pelanggan GNP',
    clientCompany: p.pelanggan?.alamat || '-',
    clientPhone: p.pelanggan?.nomor_telepon || '-',
    clientEmail: p.pelanggan?.email || undefined,
    unitId: String(p.id_unit ?? p.unit?.id_unit ?? ''),
    unitName,
    unitCapacityTon: Number(p.unit?.kapasitas) || 0,
    startDate,
    durationShift,
    projectCity: p.lokasi_proyek,
    projectAddress: p.pelanggan?.alamat || p.lokasi_proyek,
    cargoDescription: p.keterangan || undefined,
    additionalNotes: p.keterangan || undefined,
    status: mapBackendStatus(p.status),
    baseRentalCost: estimasi,
    mobDemobCost: 0,
    finalCost: estimasi,
    ownerNotes: p.approval?.catatan || undefined,
    approvedByOwnerAt: p.approval?.tanggal || undefined,
    createdAt: p.tanggal_pengajuan
      ? new Date(p.tanggal_pengajuan).toLocaleString('id-ID')
      : '-',
    updatedAt: p.tanggal_pengajuan
      ? new Date(p.tanggal_pengajuan).toLocaleString('id-ID')
      : '-',
  };
}

export async function fetchUnits(): Promise<HeavyEquipmentUnit[]> {
  const data = await apiFetch<{ items: ApiUnit[] }>('/units?per_page=100');
  return data.items.map(mapUnitFromApi);
}

export interface CreatePengajuanPayload {
  id_unit: number;
  nama: string;
  nomor_telepon: string;
  email?: string;
  alamat: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  lokasi_proyek: string;
  keterangan?: string;
}

export async function createPengajuan(payload: CreatePengajuanPayload): Promise<BookingSubmission> {
  const data = await apiFetch<ApiPengajuan>('/pengajuan', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return mapPengajuanFromApi(data);
}

export async function fetchPengajuanStatus(kode: string): Promise<BookingSubmission> {
  const cleanCode = encodeURIComponent(kode.trim().toUpperCase());
  const data = await apiFetch<ApiPengajuan>(`/pengajuan/status/${cleanCode}`);
  return mapPengajuanFromApi(data);
}

export interface SimulasiPayload {
  jenis_kebutuhan: string;
  kapasitas_beban: number;
  lokasi_proyek: string;
  periode_penggunaan: string;
  jenis_unit?: string;
}

export async function submitSimulasi(payload: SimulasiPayload) {
  return apiFetch('/simulasi', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginAdmin(email: string, password: string): Promise<{ token: string; user: AuthUser }> {
  const data = await apiFetch<{ token: string; token_type: string; user: AuthUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setAuthSession(data.token, data.user);
  return { token: data.token, user: data.user };
}

export async function logoutAdmin(): Promise<void> {
  try {
    await apiFetch('/auth/logout', { method: 'POST' });
  } finally {
    clearAuthSession();
  }
}

export async function fetchAllPengajuan(): Promise<BookingSubmission[]> {
  const data = await apiFetch<{ items: ApiPengajuan[] }>('/pengajuan?per_page=100');
  return data.items.map(mapPengajuanFromApi);
}

export async function updatePengajuanStatusApi(
  id: string,
  status: 'diproses' | 'selesai' | 'dibatalkan'
): Promise<BookingSubmission> {
  const data = await apiFetch<ApiPengajuan>(`/pengajuan/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return mapPengajuanFromApi(data);
}

export async function submitOwnerApprovalApi(
  id: string,
  keputusan: 'disetujui' | 'ditolak',
  catatan?: string
) {
  return apiFetch(`/pengajuan/${id}/approval`, {
    method: 'POST',
    body: JSON.stringify({ keputusan, catatan }),
  });
}

// ── CRUD UNIT (Admin) ───────────────────────────────────────────────────────
export interface UnitPayload {
  nama_unit: string;
  jenis_unit: string;
  kapasitas: number;
  spesifikasi?: string;
  lokasi_unit?: string;
  sumber_unit: 'GNP' | 'Rekanan';
  harga_sewa: number;
  status?: string;
  id_rekanan?: number | null;
}

export async function createUnitApi(payload: UnitPayload) {
  return apiFetch('/units', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateUnitApi(id: string | number, payload: Partial<UnitPayload>) {
  return apiFetch(`/units/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteUnitApi(id: string | number) {
  return apiFetch(`/units/${id}`, {
    method: 'DELETE',
  });
}

// ── CRUD PELANGGAN (Admin) ──────────────────────────────────────────────────
export interface PelangganItem {
  id_pelanggan: number;
  nama: string;
  nomor_telepon: string;
  email?: string | null;
  alamat?: string | null;
}

export async function fetchAllPelangganApi(): Promise<PelangganItem[]> {
  const data = await apiFetch<{ items?: PelangganItem[] } | PelangganItem[]>('/pelanggan?per_page=100');
  return Array.isArray(data) ? data : (data.items ?? []);
}

export async function createPelangganApi(payload: Omit<PelangganItem, 'id_pelanggan'>) {
  return apiFetch<PelangganItem>('/pelanggan', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updatePelangganApi(id: number, payload: Partial<Omit<PelangganItem, 'id_pelanggan'>>) {
  return apiFetch<PelangganItem>(`/pelanggan/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deletePelangganApi(id: number) {
  return apiFetch(`/pelanggan/${id}`, {
    method: 'DELETE',
  });
}

// ── CRUD JADWAL (Admin) ─────────────────────────────────────────────────────
export interface JadwalItem {
  id_jadwal: number;
  id_unit: number;
  id_pengajuan?: number | null;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: string;
  unit?: { nama_unit?: string };
}

export async function fetchAllJadwalApi(): Promise<JadwalItem[]> {
  const data = await apiFetch<{ items?: JadwalItem[] } | JadwalItem[]>('/jadwal?per_page=100');
  return Array.isArray(data) ? data : (data.items ?? []);
}

export async function createJadwalApi(payload: {
  id_unit: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status?: string;
}) {
  return apiFetch<JadwalItem>('/jadwal', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteJadwalApi(id: number) {
  return apiFetch(`/jadwal/${id}`, {
    method: 'DELETE',
  });
}
