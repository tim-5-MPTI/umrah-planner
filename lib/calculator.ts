// lib/calculator.ts

import type {
  CalculatorInput,
  CostBreakdown,
  FixedCosts,
  DynamicCosts,
  TransportOption,
  MealOption,
} from '@/lib/types'

// ============================================
// HELPER: Ambil harga transport dari constants
// ============================================
const getTransportPrice = (
  option: TransportOption | null,
  constants: Record<string, number>
): number => {
  if (!option || option === 'none') return 0
  const key = `transport_${option}`
  return constants[key] ?? 0
}

// ============================================
// HELPER: Ambil harga makan dari constants
// ============================================
const getMealPricePerDay = (
  option: MealOption | null,
  constants: Record<string, number>
): number => {
  if (!option || option === 'none') return 0
  const key = `meal_${option}`
  return constants[key] ?? 0
}

// ============================================
// MAIN CALCULATOR FUNCTION
// ============================================
export const calculateBudget = (input: CalculatorInput): CostBreakdown => {
  const {
    budget_amount,
    is_no_limit,
    adult_count,
    child_count,
    selected_flight,
    selected_transport,
    selected_meal,
    selected_room_makkah,
    selected_room_madinah,
    nights_makkah,
    nights_madinah,
    constants,
  } = input

  const total_pax = adult_count + child_count
  const sar_rate = constants['sar_idr_rate'] ?? 4300
  const total_nights = nights_makkah + nights_madinah

  // ── Fixed Costs ──────────────────────────────
  const visa = (constants['visa_fee'] ?? 2500000) * total_pax
  const meningitis = (constants['meningitis_fee'] ?? 350000) * total_pax
  const transport = getTransportPrice(selected_transport, constants) * total_pax
  const meal =
    getMealPricePerDay(selected_meal, constants) * total_nights * total_pax
  const flight = selected_flight
    ? selected_flight.price_idr * total_pax
    : 0

  const fixed: FixedCosts = { visa, meningitis, transport, meal, flight }
  const total_fixed = visa + meningitis + transport + meal + flight

  // ── Dynamic Costs (Hotel) ─────────────────────
  const hotel_makkah = selected_room_makkah
    ? Math.round(selected_room_makkah.price_per_night * sar_rate) * nights_makkah
    : 0

  const hotel_madinah = selected_room_madinah
    ? Math.round(selected_room_madinah.price_per_night * sar_rate) * nights_madinah
    : 0

  const dynamic: DynamicCosts = { hotel_makkah, hotel_madinah }
  const total_dynamic = hotel_makkah + hotel_madinah

  // ── Total & Validation ────────────────────────
  const total = total_fixed + total_dynamic

  let remaining_budget: number | null = null
  let is_sufficient: boolean | null = null

  if (!is_no_limit && budget_amount !== null) {
    remaining_budget = budget_amount - total
    is_sufficient = remaining_budget >= 0
  } else if (is_no_limit) {
    remaining_budget = null
    is_sufficient = true
  }

  return {
    fixed,
    dynamic,
    total_fixed,
    total_dynamic,
    total,
    remaining_budget,
    is_sufficient,
  }
}

// ============================================
// HELPER: Hitung minimum budget yang dibutuhkan
// ============================================
export const calculateMinimumBudget = (
  adult_count: number,
  child_count: number,
  constants: Record<string, number>,
  flight_price: number = 0,
  transport_price: number = 0,
  meal_price_daily: number = 0,
  total_nights: number = 0
): number => {
  const total_pax = adult_count + child_count
  const visa = (constants['visa_fee'] ?? 2500000) * total_pax
  const meningitis = (constants['meningitis_fee'] ?? 350000) * total_pax
  const transport = transport_price * total_pax
  const meal = meal_price_daily * total_nights * total_pax
  const flight = flight_price * total_pax
  return visa + meningitis + transport + meal + flight
}

// ============================================
// HELPER: Convert constants array ke Record
// ============================================
export const constantsToRecord = (
  constants: { key_name: string; value: number }[]
): Record<string, number> => {
  return constants.reduce(
    (acc, cur) => ({ ...acc, [cur.key_name]: cur.value }),
    {} as Record<string, number>
  )
}

// ============================================
// HELPER: Cek apakah hotel terjangkau
// ============================================
export const isHotelAffordable = (
  price_per_night_sar: number,
  nights: number,
  remaining_budget: number,
  sar_rate: number
): boolean => {
  const total = Math.round(price_per_night_sar * sar_rate) * nights
  return total <= remaining_budget
}