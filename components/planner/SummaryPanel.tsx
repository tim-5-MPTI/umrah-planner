'use client'

import { useRouter } from 'next/navigation'
import { usePlannerStore } from '@/store/plannerStore'
import { useConstants } from '@/hooks/useSupabase'
import { useCalculator } from '@/hooks/useCalculator'
import { formatIDR } from '@/utils/formatCurrency'
import { TRANSPORT_OPTIONS, MEAL_OPTIONS } from '@/constants/budgetPresets'

export default function SummaryPanel() {
  const store = usePlannerStore()
  const router = useRouter()
  const { data: constants } = useConstants()
  const breakdown = useCalculator(constants)

  const transportLabel = TRANSPORT_OPTIONS.find(t => t.value === store.selected_transport)?.label ?? '-'
  const mealLabel = MEAL_OPTIONS.find(m => m.value === store.selected_meal)?.label ?? '-'
  const isOverBudget = breakdown?.is_sufficient === false

  const items = [
    {
      label: 'Hotel Makkah & Madinah',
      sub: store.selected_hotel_makkah
        ? `${store.selected_hotel_makkah.name} & ${store.selected_hotel_madinah?.name ?? '...'}`
        : 'Belum dipilih',
      amount: breakdown ? breakdown.dynamic.hotel_makkah + breakdown.dynamic.hotel_madinah : null,
    },
    {
      label: 'Penerbangan',
      sub: store.selected_flight
        ? `${store.selected_flight.airlines} • ${store.selected_flight.flight_type}`
        : 'Belum dipilih',
      amount: breakdown?.fixed.flight ?? null,
    },
    {
      label: 'Transportasi & Makan',
      sub: `${transportLabel} • ${mealLabel}`,
      amount: breakdown ? breakdown.fixed.transport + breakdown.fixed.meal : null,
    },
    {
      label: 'Visa & Asuransi',
      sub: `${store.adult_count + store.child_count} Jamaah`,
      amount: breakdown ? breakdown.fixed.visa + breakdown.fixed.meningitis : null,
    },
  ]

  return (
    <div className="lg:sticky lg:top-24 rounded-2xl p-4 md:p-5 space-y-4 border"
      style={{ background: '#F9F6F0', borderColor: '#C5A059' }}>

      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#735C00' }}>
        Ringkasan Anggaran
      </p>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: '#26170C' }}>{item.label}</p>
              <p className="text-xs truncate" style={{ color: '#735C00' }}>{item.sub}</p>
            </div>
            <span className="text-xs font-semibold whitespace-nowrap" style={{ color: '#26170C' }}>
              {item.amount !== null ? formatIDR(item.amount) : '-'}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3" style={{ borderColor: '#D4CCB0' }}>
        <p className="text-xs mb-1" style={{ color: '#735C00' }}>Total Estimasi</p>
        <p className="text-xl md:text-2xl font-bold" style={{ color: '#26170C' }}>
          {breakdown ? formatIDR(breakdown.total) : 'Rp 0'}
        </p>
      </div>

      {isOverBudget && breakdown && (
        <div className="rounded-xl p-3"
          style={{ background: '#FFDAD633', border: '1px solid #FFDAD6' }}>
          <p className="text-xs font-semibold" style={{ color: '#BA1A2C' }}>
            ⚠ Melebihi Target Budget
          </p>
          <p className="text-xs mt-1" style={{ color: '#BA1A2C' }}>
            Anggaran Anda saat ini{' '}
            <span className="font-semibold">{formatIDR(store.budget_amount ?? 0)}</span>.
            Perlu tambahan{' '}
            <span className="font-semibold">
              {formatIDR(Math.abs(breakdown.remaining_budget ?? 0))}
            </span>
          </p>
        </div>
      )}

      <button
        onClick={() => router.push('/result')}
        className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
        style={{ background: '#26170C', color: '#FFE088' }}>
        Lihat Hasil Kalkulasi
      </button>

      <p className="text-xs text-center leading-relaxed" style={{ color: '#735C00', opacity: 0.7 }}>
        Harga dapat berubah sewaktu-waktu. Kami tidak menjamin ketersediaan kamar atau penerbangan.
      </p>
    </div>
  )
}