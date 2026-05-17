import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PlannerState, PlannerFormData } from '@/lib/types'

type ModalType = 'flight' | 'hotel-makkah' | 'hotel-madinah' | 'hotel-detail' | null
type FlightClass = 'economy' | 'business'

const INITIAL_FORM: PlannerFormData = {
  departure_date: null,
  return_date: null,
  budget_preset: null,
  budget_amount: null,
  is_no_limit: false,
  adult_count: 2,
  child_count: 0,
  origin_airport: 'CGK',
  destination_airport: 'JED',
  selected_flight: null,
  selected_transport: 'bus',
  selected_meal: 'default',
  distance_preference: null,
  selected_hotel_makkah: null,
  selected_room_makkah: null,
  selected_hotel_madinah: null,
  selected_room_madinah: null,
  nights_makkah: 7,
  nights_madinah: 5,
}

interface ExtendedState extends PlannerState {
  open_modal: ModalType
  flight_class: FlightClass
  hotel_for_detail: any | null
  setModal: (modal: ModalType) => void
  setFlightClass: (cls: FlightClass) => void
  setHotelForDetail: (hotel: any | null) => void
}

export const usePlannerStore = create<ExtendedState>()(
  persist(
    (set) => ({
      ...INITIAL_FORM,
      current_step: 1,
      open_modal: null,
      flight_class: 'economy',
      hotel_for_detail: null,

      setStep: (step: number) => set({ current_step: step }),
      nextStep: () => set((s) => ({ current_step: Math.min(s.current_step + 1, 5) })),
      prevStep: () => set((s) => ({ current_step: Math.max(s.current_step - 1, 1) })),
      updateForm: (data: Partial<PlannerFormData>) => set((s) => ({ ...s, ...data })),
      resetForm: () => set({ ...INITIAL_FORM, current_step: 1, open_modal: null }),
      setModal: (modal: ModalType) => set({ open_modal: modal }),
      setFlightClass: (cls: FlightClass) => set({ flight_class: cls }),
      setHotelForDetail: (hotel: any | null) => set({ hotel_for_detail: hotel }),
    }),
    {
      name: 'umratee-planner-v2',
      partialize: (s) => ({
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
        nights_makkah: s.nights_makkah,
        nights_madinah: s.nights_madinah,
        departure_date: s.departure_date,
        return_date: s.return_date,
        distance_preference: s.distance_preference,
        selected_hotel_makkah: s.selected_hotel_makkah,
        selected_room_makkah: s.selected_room_makkah,
        selected_hotel_madinah: s.selected_hotel_madinah,
        selected_room_madinah: s.selected_room_madinah,
      }),
    }
  )
)