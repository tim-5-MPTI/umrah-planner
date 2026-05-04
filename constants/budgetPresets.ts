// constants/budgetPresets.ts

import type {
  BudgetPresetConfig,
  TransportOptionConfig,
  MealOptionConfig,
} from '@/lib/types'

export const BUDGET_PRESETS: BudgetPresetConfig[] = [
  {
    value: 'under_20m',
    label: 'Di bawah Rp 20 juta',
    min: 0,
    max: 20000000,
    displayAmount: 20000000,
  },
  {
    value: '20m_30m',
    label: 'Rp 20 juta – Rp 30 juta',
    min: 20000000,
    max: 30000000,
    displayAmount: 25000000,
  },
  {
    value: '30m_50m',
    label: 'Rp 30 juta – Rp 50 juta',
    min: 30000000,
    max: 50000000,
    displayAmount: 40000000,
  },
  {
    value: 'above_50m',
    label: 'Di atas Rp 50 juta',
    min: 50000000,
    max: null,
    displayAmount: 50000000,
  },
  {
    value: 'no_limit',
    label: 'Tanpa Batas Anggaran',
    min: 0,
    max: null,
    displayAmount: 0,
  },
]

export const TRANSPORT_OPTIONS: TransportOptionConfig[] = [
  {
    value: 'bus',
    label: 'Bus',
    description: 'Bus reguler rute Bandara → Makkah → Madinah → Bandara',
    price_idr: 600000,
    key_name: 'transport_bus',
  },
  {
    value: 'kereta',
    label: 'Kereta Cepat Haramain',
    description: 'Kereta cepat rute Jeddah – Makkah – Madinah PP',
    price_idr: 1500000,
    key_name: 'transport_kereta',
  },
  {
    value: 'mobil',
    label: 'Mobil Pribadi / Sewa',
    description: 'Kendaraan eksklusif seperti GMC atau Innova',
    price_idr: 2000000,
    key_name: 'transport_mobil',
  },
  {
    value: 'travel',
    label: 'Travel / Taksi',
    description: 'Layanan travel door-to-door melalui penyedia lokal',
    price_idr: 1000000,
    key_name: 'transport_travel',
  },
  {
    value: 'none',
    label: 'Tidak Include Transportasi',
    description: 'Atur sendiri di luar aplikasi',
    price_idr: 0,
    key_name: 'transport_none',
  },
]

export const MEAL_OPTIONS: MealOptionConfig[] = [
  {
    value: 'default',
    label: 'Default (Estimasi Harian)',
    description: 'Estimasi biaya makan harian mandiri',
    price_idr_daily: 200000,
    key_name: 'meal_default',
  },
  {
    value: 'catering',
    label: 'Katering Standar',
    description: 'Paket makan kotak 3x sehari per jemaah',
    price_idr_daily: 150000,
    key_name: 'meal_catering',
  },
  {
    value: 'restoran',
    label: 'Restoran',
    description: 'Makan prasmanan hotel atau restoran terpilih',
    price_idr_daily: 350000,
    key_name: 'meal_restoran',
  },
  {
    value: 'none',
    label: 'Tidak Include Makan',
    description: 'Atur sendiri di luar aplikasi',
    price_idr_daily: 0,
    key_name: 'meal_none',
  },
]