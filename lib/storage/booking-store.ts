'use client';

import { BookingSubmission, BookingStatus } from '../types/booking';
import { ARMADA_UNITS } from '../data/armada';

const STORAGE_KEY = 'gnp_heavy_equipment_bookings_v1';

// Seed sample initial bookings for demo / testing
const INITIAL_DEMO_BOOKINGS: BookingSubmission[] = [
  {
    id: 'b-demo-01',
    bookingCode: 'GNP-2025-88A12',
    clientName: 'Ir. Hendro Wijaya',
    clientCompany: 'PT Wijaya Konstruksi Semarang',
    clientPhone: '081234567801',
    clientEmail: 'hendro@wijayakonstruksi.co.id',
    unitId: 'gnp-fl-5',
    unitName: 'Forklift Diesel 5 Ton',
    unitCapacityTon: 5.0,
    startDate: '2026-11-05',
    durationShift: 3,
    projectCity: 'Kawasan Industri Wijayakusuma, Semarang',
    projectAddress: 'Jl. Raya Semarang-Kendal Km 12',
    cargoWeightTon: 4.2,
    cargoDescription: 'Penurunan mesin genset pabrik dan panel trafo',
    additionalNotes: 'Lantai pabrik cor semen baru, butuh ban pneumatic halus. Tinggi angkat 3.5 meter.',
    status: 'Disetujui',
    baseRentalCost: 5400000,
    mobDemobCost: 850000,
    finalCost: 6250000,
    adminNotes: 'Jadwal unit GNP-FL-5 kosong tgl 5-7 Nov. Operator Pak Joko SIO aktif siap.',
    ownerNotes: 'Disetujui Om Fajru. Mob-demob area Wijayakusuma disepakati Rp 850.000 (PP). Silakan koordinasi SPK.',
    approvedByOwnerAt: '2026-10-28 14:30 WIB',
    createdAt: '2026-10-28 09:15 WIB',
    updatedAt: '2026-10-28 14:30 WIB',
  },
  {
    id: 'b-demo-02',
    bookingCode: 'GNP-2025-45C99',
    clientName: 'Bagus Setiawan',
    clientCompany: 'CV Solo Logistik Makmur',
    clientPhone: '081398765432',
    clientEmail: 'bagus@solologistik.com',
    unitId: 'gnp-fl-7',
    unitName: 'Forklift Diesel 7 Ton',
    unitCapacityTon: 7.0,
    startDate: '2026-11-10',
    durationShift: 2,
    projectCity: 'Surakarta / Solo',
    projectAddress: 'Gudang Logistik Palur, Karanganyar',
    cargoWeightTon: 6.0,
    cargoDescription: 'Bongkar kontainer coil baja gulungan',
    additionalNotes: 'Butuh operator berpengalaman bongkar coil berat.',
    status: 'Diperiksa',
    baseRentalCost: 4800000,
    mobDemobCost: 0,
    finalCost: 4800000,
    adminNotes: 'Admin sedang cek ketersediaan armada lowbed pengangkut untuk mobilisasi ke Solo.',
    ownerNotes: '',
    createdAt: '2026-10-28 16:40 WIB',
    updatedAt: '2026-10-28 17:00 WIB',
  },
  {
    id: 'b-demo-03',
    bookingCode: 'GNP-2025-12K34',
    clientName: 'Eko Prasetya',
    clientCompany: 'PT Cipta Karya Jogja',
    clientPhone: '081578901234',
    clientEmail: 'eko@ciptakaryajogja.id',
    unitId: 'rekanan-crane-25',
    unitName: 'Mobile Crane 25 Ton (Sumber: Unit Rekanan)',
    unitCapacityTon: 25.0,
    startDate: '2026-11-15',
    durationShift: 1,
    projectCity: 'Sleman, D.I. Yogyakarta',
    projectAddress: 'Proyek Gudang Modern Mlati',
    cargoWeightTon: 18.0,
    cargoDescription: 'Ereksi rangka baja WF struktur atap',
    additionalNotes: 'Radius kerja 14 meter, boom butuh 24 meter.',
    status: 'Menunggu Approval',
    baseRentalCost: 5500000,
    mobDemobCost: 0,
    finalCost: 5500000,
    adminNotes: 'Mitra rekanan CV Anugerah Crane konfirmasi unit 25T ready tanggal 15 Nov. Data diteruskan ke Om Fajru.',
    ownerNotes: '',
    createdAt: '2026-10-29 08:00 WIB',
    updatedAt: '2026-10-29 08:20 WIB',
  },
];

function generateUniqueBookingCode(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `GNP-${year}-${randomStr}`;
}

export function getAllBookings(): BookingSubmission[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_BOOKINGS));
      return INITIAL_DEMO_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_BOOKINGS;
  }
}

export function getBookingByCode(code: string): BookingSubmission | undefined {
  const cleanCode = code.trim().toUpperCase();
  const bookings = getAllBookings();
  return bookings.find((b) => b.bookingCode.toUpperCase() === cleanCode);
}

export function saveBooking(
  data: Omit<
    BookingSubmission,
    | 'id'
    | 'bookingCode'
    | 'status'
    | 'baseRentalCost'
    | 'mobDemobCost'
    | 'finalCost'
    | 'createdAt'
    | 'updatedAt'
  >
): BookingSubmission {
  const bookings = getAllBookings();
  const unit = ARMADA_UNITS.find((u) => u.id === data.unitId);
  const baseRate = unit ? unit.basePricePerShift : 1500000;
  const baseTotal = baseRate * Math.max(1, data.durationShift);

  const now = new Date();
  const dateFormatted = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

  const newBooking: BookingSubmission = {
    ...data,
    id: `b-${Date.now()}`,
    bookingCode: generateUniqueBookingCode(),
    status: 'Diajukan',
    baseRentalCost: baseTotal,
    mobDemobCost: 0,
    finalCost: baseTotal,
    adminNotes: 'Menunggu review ketersediaan oleh Admin GNP.',
    ownerNotes: '',
    createdAt: dateFormatted,
    updatedAt: dateFormatted,
  };

  const updated = [newBooking, ...bookings];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newBooking;
}

export function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  adminNotes?: string
): BookingSubmission | null {
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === bookingId);
  if (index === -1) return null;

  const now = new Date();
  const dateFormatted = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

  bookings[index] = {
    ...bookings[index],
    status: newStatus,
    adminNotes: adminNotes !== undefined ? adminNotes : bookings[index].adminNotes,
    updatedAt: dateFormatted,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
  return bookings[index];
}

export function ownerApproval(
  bookingId: string,
  decision: 'Disetujui' | 'Ditolak',
  mobDemobCost: number,
  ownerNotes: string
): BookingSubmission | null {
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === bookingId);
  if (index === -1) return null;

  const now = new Date();
  const dateFormatted = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

  const finalCost =
    decision === 'Disetujui'
      ? bookings[index].baseRentalCost + Math.max(0, mobDemobCost)
      : bookings[index].baseRentalCost;

  bookings[index] = {
    ...bookings[index],
    status: decision,
    mobDemobCost: Math.max(0, mobDemobCost),
    finalCost,
    ownerNotes,
    approvedByOwnerAt: dateFormatted,
    updatedAt: dateFormatted,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
  return bookings[index];
}

