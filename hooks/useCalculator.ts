// hooks/useCalculator.ts

import { useMemo } from 'react'
import { usePlannerForm } from '@/store/plannerStore'
import { calculateBudget, constantsToRecord } from '@/lib/calculator'
import type { CostBreakdown, SystemConstant } from '@/lib/types'

export const useCalculator = (
  constants: SystemConstant[]
): CostBreakdown | null => {
  const form = usePlannerForm()

  return useMemo(() => {
    if (!constants || constants.length === 0) return null

    const constantsRecord = constantsToRecord(constants)
    const total_pax = form.adult_count + form.child_count

    return calculateBudget({
      budget_amount: form.budget_amount,
      is_no_limit: form.is_no_limit,
      adult_count: form.adult_count,
      child_count: form.child_count,
      total_pax,
      selected_flight: form.selected_flight,
      selected_transport: form.selected_transport,
      selected_meal: form.selected_meal,
      selected_room_makkah: form.selected_room_makkah,
      selected_room_madinah: form.selected_room_madinah,
      nights_makkah: form.nights_makkah,
      nights_madinah: form.nights_madinah,
      constants: constantsRecord,
    })
  }, [form, constants])
}