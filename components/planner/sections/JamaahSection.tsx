'use client'

import { usePlannerStore } from '@/store/plannerStore'

export default function JamaahSection() {
  const { adult_count, child_count, updateForm } = usePlannerStore()

  return (
    <div className="rounded-2xl border p-5 space-y-4"
      style={{ background: '#FDFBF7', borderColor: '#C5A059' }}>
      <div className="flex items-center gap-2">
        <span>👥</span>
        <h2 className="font-semibold" style={{ color: '#26170C' }}>Jumlah Jamaah</h2>
      </div>

      <div className="rounded-xl border p-4 space-y-3"
        style={{ borderColor: '#C5A059', background: '#F9F6F0' }}>

        {/* Dewasa */}
        <div className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: '#FDFBF7' }}>
          <span className="text-sm font-medium" style={{ color: '#26170C' }}>Dewasa</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateForm({ adult_count: Math.max(1, adult_count - 1) })}
              className="w-9 h-9 rounded-full border flex items-center justify-center font-bold text-lg transition-all hover:opacity-80"
              style={{ borderColor: '#C5A059', color: '#26170C', background: '#FDFBF7' }}>
              −
            </button>
            <span className="text-lg font-bold w-6 text-center" style={{ color: '#26170C' }}>
              {adult_count}
            </span>
            <button
              onClick={() => updateForm({ adult_count: adult_count + 1 })}
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-all hover:opacity-80"
              style={{ background: '#26170C', color: '#FDFBF7' }}>
              +
            </button>
          </div>
        </div>

        {/* Anak */}
        <div className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: '#FDFBF7' }}>
          <span className="text-sm font-medium" style={{ color: '#26170C' }}>Anak</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateForm({ child_count: Math.max(0, child_count - 1) })}
              className="w-9 h-9 rounded-full border flex items-center justify-center font-bold text-lg transition-all hover:opacity-80"
              style={{ borderColor: '#C5A059', color: '#26170C', background: '#FDFBF7' }}>
              −
            </button>
            <span className="text-lg font-bold w-6 text-center" style={{ color: '#26170C' }}>
              {child_count}
            </span>
            <button
              onClick={() => updateForm({ child_count: child_count + 1 })}
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition-all hover:opacity-80"
              style={{ background: '#26170C', color: '#FDFBF7' }}>
              +
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs" style={{ color: '#735C00' }}>
        Total: <span className="font-semibold" style={{ color: '#26170C' }}>
          {adult_count + child_count} Jamaah
        </span>
        {' '}({adult_count} Dewasa{child_count > 0 ? `, ${child_count} Anak` : ''})
      </p>
    </div>
  )
}