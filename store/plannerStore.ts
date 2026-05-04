// store/plannerStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PlannerState, PlannerFormData, Flight, Hotel, Room } from '@/lib/types'

const INITIAL_FORM: PlannerFormData = {
  // Step 1
  departure_date: null,
  return_date: null,
  budget_preset: null,
  budget_amount: null,
  is_no_limit: false,
  adult_count: 2,
  child_count: 0,

  // Step 2
  origin_airport: null,
  destination_airport: null,
  selected_flight: null,

  // Step 3
  selected_transport: null,
  selected_meal: null,

  // Step 4
  distance_preference: null,
  selected_hotel_makkah: null,
  selected_room_makkah: null,
  selected_hotel_madinah: null,
  selected_room_madinah: null,

  // Step 5
  nights_makkah: 4,
  nights_madinah: 4,
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      ...INITIAL_FORM,
      current_step: 1,

      setStep: (step) => set({ current_step: step }),

      nextStep: () =>
        set((state) => ({
          current_step: Math.min(state.current_step + 1, 5),
        })),

      prevStep: () =>
        set((state) => ({
          current_step: Math.max(state.current_step - 1, 1),
        })),

      updateForm: (data) => set((state) => ({ ...state, ...data })),

      resetForm: () => set({ ...INITIAL_FORM, current_step: 1 }),
    }),
    {
      name: 'umratee-planner',
      partialize: (state) => ({
        ...state,
        current_step: state.current_step,
      }),
    }
  )
)

// ============================================
// SELECTOR HOOKS (untuk performa lebih baik)
// ============================================

export const useCurrentStep = () =>
  usePlannerStore((s) => s.current_step)

export const usePlannerForm = () =>
  usePlannerStore((s) => ({
    departure_date: s.departure_date,
    return_date: s.return_date,
    budget_preset: s.budget_preset,
    budget_amount: s.budget_amount,
    is_no_limit: s.is_no_limit,
    adult_count: s.adult_count,
    child_count: s.child_count,
    origin_airport: s.origin_airport,
    destination_airport: s.destination_airport,
    selected_flight: s.selected_flight,
    selected_transport: s.selected_transport,
    selected_meal: s.selected_meal,
    distance_preference: s.distance_preference,
    selected_hotel_makkah: s.selected_hotel_makkah,
    selected_room_makkah: s.selected_room_makkah,
    selected_hotel_madinah: s.selected_hotel_madinah,
    selected_room_madinah: s.selected_room_madinah,
    nights_makkah: s.nights_makkah,
    nights_madinah: s.nights_madinah,
  }))

export const useSelectedFlight = () =>
  usePlannerStore((s) => s.selected_flight)

export const useSelectedHotels = () =>
  usePlannerStore((s) => ({
    hotel_makkah: s.selected_hotel_makkah,
    room_makkah: s.selected_room_makkah,
    hotel_madinah: s.selected_hotel_madinah,
    room_madinah: s.selected_room_madinah,
  }))

export const usePlannerActions = () =>
  usePlannerStore((s) => ({
    setStep: s.setStep,
    nextStep: s.nextStep,
    prevStep: s.prevStep,
    updateForm: s.updateForm,
    resetForm: s.resetForm,
  }))