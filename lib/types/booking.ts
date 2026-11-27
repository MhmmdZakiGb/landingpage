export type BookingStatus =
  | 'Diajukan'
  | 'Diperiksa'
  | 'Perlu Konfirmasi'
  | 'Menunggu Approval'
  | 'Disetujui'
  | 'Ditolak'
  | 'Selesai'
  | 'Dibatalkan';

export type UnitSource = 'Milik GNP' | 'Unit Rekanan';

export interface HeavyEquipmentUnit {
  id: string;
  name: string;
  category: 'Forklift' | 'Mobile Crane' | 'Excavator';
  capacityTon: number;
  source: UnitSource;
  partnerNameInternal?: string; // Hanya untuk database internal / admin
  image: string;
  specs: string[];
  features: string[];
  isAvailable: boolean;
  basePricePerShift: number; // Estimasi tarif harian/shift
}

export interface BookingSubmission {
  id: string;
  bookingCode: string; // Format: GNP-2025-XXXXX
  clientName: string;
  clientCompany: string;
  clientPhone: string;
  clientEmail?: string;
  unitId: string;
  unitName: string;
  unitCapacityTon: number;
  startDate: string; // YYYY-MM-DD
  durationShift: number; // Jumlah shift / hari
  projectCity: string; // Semarang, Solo, Kudus, DIY, dll
  projectAddress: string;
  cargoWeightTon?: number;
  cargoDescription?: string;
  additionalNotes?: string; // Keterangan teknis (tinggi mast, medan, jenis ban)
  status: BookingStatus;
  baseRentalCost: number;
  mobDemobCost: number; // Ditetapkan oleh Owner
  finalCost: number; // Total sewa + Mob-Demob
  adminNotes?: string;
  ownerNotes?: string;
  approvedByOwnerAt?: string;
  createdAt: string;
  updatedAt: string;
}

