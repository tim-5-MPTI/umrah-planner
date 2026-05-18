'use client'

import { usePlannerStore } from '@/store/plannerStore'
import type { BudgetPreset } from '@/lib/types'

const PRESET_BUTTONS = [
  { label: 'Rp 20JT - 35JT', value: 'under_20m' as BudgetPreset, amount: 27500000 },
  { label: 'Rp 35JT - 50JT', value: '20m_30m' as BudgetPreset, amount: 42500000 },
  { label: '> Rp 50JT', value: 'above_50m' as BudgetPreset, amount: 50000000 },
]

export default function BudgetSection() {
  const { budget_preset, budget_amount, is_no_limit, updateForm } = usePlannerStore()

  return (
    <div className="rounded-2xl border p-5 space-y-4"
      style={{ background: '#FDFBF7', borderColor: '#C5A059' }}>
      <div className="flex items-center gap-2">
        <span>💰</span>
        <h2 className="font-semibold" style={{ color: '#26170C' }}>Budget Anda</h2>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: '#735C00' }}>
          Pilih Range Budget Anda
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_BUTTONS.map((preset) => (
            <button key={preset.value}
              onClick={() => updateForm({ budget_preset: preset.value, budget_amount: preset.amount, is_no_limit: false })}
              className="px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium border transition-all"
              style={{
                background: budget_preset === preset.value && !is_no_limit ? '#26170C' : '#F9F6F0',
                color: budget_preset === preset.value && !is_no_limit ? '#FDFBF7' : '#26170C',
                borderColor: budget_preset === preset.value && !is_no_limit ? '#26170C' : '#C5A059',
              }}>
              {preset.label}
            </button>
          ))}
          <button
            onClick={() => updateForm({ is_no_limit: true, budget_preset: 'no_limit', budget_amount: null })}
            className="px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium border transition-all"
            style={{
              background: is_no_limit ? '#26170C' : '#F9F6F0',
              color: is_no_limit ? '#FDFBF7' : '#26170C',
              borderColor: is_no_limit ? '#26170C' : '#C5A059',
            }}>
            Tanpa Batasan Budget ↗
          </button>
        </div>
      </div>

      {!is_no_limit && (
        <div>
          <p className="text-xs uppercase tracking-wide font-medium mb-2" style={{ color: '#735C00' }}>
            Masukan Budget Spesifik (Opsional)
          </p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium"
              style={{ color: '#735C00' }}>Rp</span>
            <input
              type="text"
              placeholder="35.000.000"
              value={budget_amount ? budget_amount.toLocaleString('id-ID') : ''}
              onChange={(e) => {
                const raw = e.target.value.replace(/\./g, '').replace(/[^0-9]/g, '')
                updateForm({ budget_amount: raw ? parseInt(raw) : null })
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none border"
              style={{ background: '#F9F6F0', borderColor: '#C5A059', color: '#26170C' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}