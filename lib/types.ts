// lib/types.ts

export type CityEnum = 'Makkah' | 'Madinah'
export type RoomTypeEnum = 'Single' | 'Double' | 'Triple' | 'Quad'
export type ModalType = 'flight' | 'hotel-makkah' | 'hotel-madinah' | 'hotel-detail' | null
export type FlightClass = 'economy' | 'business'

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

export interface PlannerFormData {
  departure_date: string | null
  return_date: string | null
  budget_preset: BudgetPreset | null
  budget_amount: number | null
  is_no_limit: boolean
  adult_count: number
  child_count: number
  origin_airport: string | null
  destination_airport: string | null
  selected_flight: Flight | null
  selected_transport: TransportOption | null
  selected_meal: MealOption | null
  distance_preference: number | null
  selected_hotel_makkah: Hotel | null
  selected_room_makkah: Room | null
  selected_hotel_madinah: Hotel | null
  selected_room_madinah: Room | null
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

export interface PlannerResult {
  form: PlannerFormData
  breakdown: CostBreakdown
  generated_at: string
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

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