// hooks/useCalculator.ts
import { useMemo } from 'react'
import { usePlannerStore } from '@/store/plannerStore'
import { calculateBudget, constantsToRecord } from '@/lib/calculator'
import type { CostBreakdown, SystemConstant } from '@/lib/types'

export const useCalculator = (
  constants: SystemConstant[]
): CostBreakdown | null => {
  const store = usePlannerStore()

  return useMemo(() => {
    if (!constants || constants.length === 0) return null

    const constantsRecord = constantsToRecord(constants)
    const total_pax = store.adult_count + store.child_count

    return calculateBudget({
      budget_amount: store.budget_amount,
      is_no_limit: store.is_no_limit,
      adult_count: store.adult_count,
      child_count: store.child_count,
      total_pax,
      selected_flight: store.selected_flight,
      selected_transport: store.selected_transport,
      selected_meal: store.selected_meal,
      selected_room_makkah: store.selected_room_makkah,
      selected_room_madinah: store.selected_room_madinah,
      nights_makkah: store.nights_makkah,
      nights_madinah: store.nights_madinah,
      constants: constantsRecord,
    })
  }, [
    store.budget_amount,
    store.is_no_limit,
    store.adult_count,
    store.child_count,
    store.selected_flight,
    store.selected_transport,
    store.selected_meal,
    store.selected_room_makkah,
    store.selected_room_madinah,
    store.nights_makkah,
    store.nights_madinah,
    constants,
  ])
}