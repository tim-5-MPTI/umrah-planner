'use client'

import { usePlannerStore } from '@/store/plannerStore'
import { TRANSPORT_OPTIONS, MEAL_OPTIONS } from '@/constants/budgetPresets'
import { formatIDR } from '@/utils/formatCurrency'
import type { TransportOption, MealOption } from '@/lib/types'

export default function TransportMealSection() {
  const { selected_transport, selected_meal, updateForm } = usePlannerStore()

  return (
    <div className="rounded-2xl border p-5 space-y-5"
      style={{ background: '#FDFBF7', borderColor: '#C5A059' }}>
      <div className="flex items-center gap-2">
        <span>🚌</span>
        <h2 className="font-semibold" style={{ color: '#26170C' }}>Transportasi & Konsumsi Lokal</h2>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide font-medium mb-3" style={{ color: '#735C00' }}>
          Pilihan Transportasi (Jeddah → Makkah → Madinah)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {TRANSPORT_OPTIONS.map((opt) => {
            const isSelected = selected_transport === opt.value
            return (
              <button key={opt.value}
                onClick={() => updateForm({ selected_transport: opt.value as TransportOption })}
                className="p-3 rounded-xl border text-left transition-all"
                style={{
                  background: isSelected ? '#26170C' : '#F9F6F0',
                  borderColor: isSelected ? '#26170C' : '#C5A059',
                }}>
                <p className="text-xs font-semibold mb-0.5"
                  style={{ color: isSelected ? '#FDFBF7' : '#26170C' }}>
                  {opt.label}
                </p>
                <p className="text-xs" style={{ color: isSelected ? '#D4CCB0' : '#735C00' }}>
                  {opt.description.split('.')[0]}
                </p>
                {opt.price_idr > 0 && (
                  <p className="text-xs font-bold mt-1"
                    style={{ color: isSelected ? '#FFE088' : '#26170C' }}>
                    + {formatIDR(opt.price_idr)}
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide font-medium mb-3" style={{ color: '#735C00' }}>
          Pilihan Konsumsi
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {MEAL_OPTIONS.map((opt) => {
            const isSelected = selected_meal === opt.value
            return (
              <button key={opt.value}
                onClick={() => updateForm({ selected_meal: opt.value as MealOption })}
                className="p-3 rounded-xl border text-left transition-all"
                style={{
                  background: isSelected ? '#FFE088' : '#F9F6F0',
                  borderColor: isSelected ? '#735C00' : '#C5A059',
                }}>
                <p className="text-xs font-semibold mb-0.5" style={{ color: '#26170C' }}>
                  {opt.label}
                </p>
                <p className="text-xs" style={{ color: '#735C00' }}>
                  {opt.description.split('.')[0]}
                </p>
                {opt.price_idr_daily > 0 && (
                  <p className="text-xs font-bold mt-1" style={{ color: '#26170C' }}>
                    + {formatIDR(opt.price_idr_daily)}/hari
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}