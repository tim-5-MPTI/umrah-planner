'use client'

import { usePlannerStore } from '@/store/plannerStore'
import { getTotalNights } from '@/lib/utils'

export default function DateDurationSection() {
  const { departure_date, return_date, nights_makkah, nights_madinah, updateForm } = usePlannerStore()
  const totalNights = getTotalNights(departure_date, return_date)

  return (
    <div className="rounded-2xl border p-5 space-y-4"
      style={{ background: '#FDFBF7', borderColor: '#C5A059' }}>
      <div className="flex items-center gap-2">
        <span>📅</span>
        <h2 className="font-semibold" style={{ color: '#26170C' }}>Tanggal & Durasi Perjalanan</h2>
      </div>

      <div className="rounded-xl px-4 py-2 flex items-center gap-2"
        style={{ background: '#FBFBE2', border: '1px solid #C5A059' }}>
        <span className="text-xs">✨</span>
        <p className="text-xs" style={{ color: '#735C00' }}>
          Tanggal Terbaik Menurut Kalender Hijriyah:{' '}
          <span className="font-semibold" style={{ color: '#26170C' }}>
            Ramadan 1447H (Feb–Mar 2026)
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Berangkat', key: 'departure_date', value: departure_date },
          { label: 'Pulang', key: 'return_date', value: return_date },
        ].map((item) => (
          <div key={item.key}>
            <label className="text-xs uppercase tracking-wide font-medium block mb-1"
              style={{ color: '#735C00' }}>{item.label}</label>
            <input
              type="date"
              value={item.value ?? ''}
              onChange={(e) => updateForm({ [item.key]: e.target.value } as any)}
              className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none border"
              style={{ background: '#F9F6F0', borderColor: '#C5A059', color: '#26170C' }}
            />
          </div>
        ))}
      </div>

      {totalNights > 0 && (
        <div className="flex justify-end">
          <span className="text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: '#26170C', color: '#FFE088' }}>
            {totalNights} MALAM
          </span>
        </div>
      )}

      <p className="text-xs uppercase tracking-wide font-medium" style={{ color: '#735C00' }}>
        Durasi Perjalanan Terencana
      </p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Malam di Makkah', key: 'nights_makkah', value: nights_makkah },
          { label: 'Malam di Madinah', key: 'nights_madinah', value: nights_madinah },
        ].map((item) => (
          <div key={item.key}>
            <label className="text-xs block mb-2" style={{ color: '#735C00' }}>{item.label}</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateForm({ [item.key]: Math.max(1, item.value - 1) } as any)}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg"
                style={{ borderColor: '#C5A059', color: '#26170C', background: '#F9F6F0' }}>
                −
              </button>
              <span className="text-lg font-semibold w-6 text-center" style={{ color: '#26170C' }}>
                {item.value}
              </span>
              <button
                onClick={() => updateForm({ [item.key]: item.value + 1 } as any)}
                className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg"
                style={{ borderColor: '#C5A059', color: '#26170C', background: '#F9F6F0' }}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}