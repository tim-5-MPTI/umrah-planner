// lib/types.ts

// ============================================
// DATABASE TYPES (sesuai schema Supabase)
// ============================================

export type CityEnum = 'Makkah' | 'Madinah'
export type RoomTypeEnum = 'Single' | 'Double' | 'Triple' | 'Quad'

export interface SystemConstant {
  id: string
  key_name: string
  value: number
  unit: string
  created_at: string
}

export interface Flight {
  id: string
  airlines: string
  origin_airport: string
  destination_airport: string
  flight_type: string
  departure_time: string
  arrival_time: string
  price_idr: number
  created_at: string
}

export interface Hotel {
  id: string
  city: CityEnum
  name: string
  distance_to_masjid_m: number
  star_rating: number
  image_url: string | null
  created_at: string
  rooms?: Room[]
}

export interface Room {
  id: string
  hotel_id: string
  room_type: RoomTypeEnum
  adult_capacity: number
  price_per_night: number
  created_at: string
}

export interface DateRecommendation {
  id: string
  name: string
  description: string
  start_date: string
  end_date: string
  category: string
  badge: string
  created_at: string
}

// ============================================
// PLANNER FORM TYPES
// ============================================

export type BudgetPreset =
  | 'under_20m'
  | '20m_30m'
  | '30m_50m'
  | 'above_50m'
  | 'no_limit'

export type TransportOption =
  | 'bus'
  | 'kereta'
  | 'mobil'
  | 'travel'
  | 'none'

export type MealOption =
  | 'catering'
  | 'restoran'
  | 'default'
  | 'none'

export interface BudgetPresetConfig {
  value: BudgetPreset
  label: string
  min: number
  max: number | null
  displayAmount: number
}

export interface TransportOptionConfig {
  value: TransportOption
  label: string
  description: string
  price_idr: number
  key_name: string
}

export interface MealOptionConfig {
  value: MealOption
  label: string
  description: string
  price_idr_daily: number
  key_name: string
}

// ============================================
// PLANNER STATE TYPES (Zustand Store)
// ============================================

export interface PlannerFormData {
  // Step 1 — Tanggal, anggaran, jamaah
  departure_date: string | null
  return_date: string | null
  budget_preset: BudgetPreset | null
  budget_amount: number | null
  is_no_limit: boolean
  adult_count: number
  child_count: number

  // Step 2 — Penerbangan
  origin_airport: string | null
  destination_airport: string | null
  selected_flight: Flight | null

  // Step 3 — Transportasi & makan
  selected_transport: TransportOption | null
  selected_meal: MealOption | null

  // Step 4 — Hotel
  distance_preference: number | null
  selected_hotel_makkah: Hotel | null
  selected_room_makkah: Room | null
  selected_hotel_madinah: Hotel | null
  selected_room_madinah: Room | null

  // Step 5 — Durasi malam
  nights_makkah: number
  nights_madinah: number
}

export interface PlannerState extends PlannerFormData {
  current_step: number
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateForm: (data: Partial<PlannerFormData>) => void
  resetForm: () => void
}

// ============================================
// CALCULATOR TYPES
// ============================================

export interface FixedCosts {
  visa: number
  meningitis: number
  transport: number
  meal: number
  flight: number
}

export interface DynamicCosts {
  hotel_makkah: number
  hotel_madinah: number
}

export interface CostBreakdown {
  fixed: FixedCosts
  dynamic: DynamicCosts
  total_fixed: number
  total_dynamic: number
  total: number
  remaining_budget: number | null
  is_sufficient: boolean | null
}

export interface CalculatorInput {
  budget_amount: number | null
  is_no_limit: boolean
  adult_count: number
  child_count: number
  total_pax: number
  selected_flight: Flight | null
  selected_transport: TransportOption | null
  selected_meal: MealOption | null
  selected_room_makkah: Room | null
  selected_room_madinah: Room | null
  nights_makkah: number
  nights_madinah: number
  constants: Record<string, number>
}

// ============================================
// RESULT / OUTPUT TYPES
// ============================================

export interface PlannerResult {
  form: PlannerFormData
  breakdown: CostBreakdown
  generated_at: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface FlightsResponse extends ApiResponse<Flight[]> {}
export interface HotelsResponse extends ApiResponse<Hotel[]> {}
export interface ConstantsResponse extends ApiResponse<SystemConstant[]> {}
export interface DateRecsResponse extends ApiResponse<DateRecommendation[]> {}

// ============================================
// UI COMPONENT PROP TYPES
// ============================================

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  selected?: boolean
  hoverable?: boolean
}

export interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gold'
  size?: 'sm' | 'md'
}

export interface CurrencyDisplayProps {
  amount: number
  currency?: 'IDR' | 'SAR'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showPrefix?: boolean
  className?: string
}

export interface AlertBannerProps {
  type: 'error' | 'warning' | 'success' | 'info'
  title: string
  message: string
  onClose?: () => void
}

export interface StepProgressProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

export interface EmptyStateProps {
  title: string
  message: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}