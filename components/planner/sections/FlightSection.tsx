'use client'

import { usePlannerStore } from '@/store/plannerStore'
import { INDONESIAN_AIRPORTS, SAUDI_AIRPORTS } from '@/constants/airports'
import { useFlights } from '@/hooks/useSupabase'
import { formatIDR } from '@/utils/formatCurrency'

export default function FlightSection() {
  const store = usePlannerStore()
  const totalPax = store.adult_count + store.child_count
  const { data: flights } = useFlights(store.origin_airport, store.destination_airport)

  return (
    <div className="rounded-2xl border p-5 space-y-4"
      style={{ background: '#FDFBF7', borderColor: '#C5A059' }}>
      <div className="flex items-center gap-2">
        <span>✈️</span>
        <h2 className="font-semibold" style={{ color: '#26170C' }}>Pilihan Maskapai</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs uppercase tracking-wide font-medium block mb-1"
            style={{ color: '#735C00' }}>Berangkat Dari</label>
          <select
            value={store.origin_airport ?? ''}
            onChange={(e) => store.updateForm({ origin_airport: e.target.value, selected_flight: null })}
            className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none border"
            style={{ background: '#F9F6F0', borderColor: '#C5A059', color: '#26170C' }}>
            {INDONESIAN_AIRPORTS.map((a) => (
              <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide font-medium block mb-1"
            style={{ color: '#735C00' }}>Tujuan</label>
          <select
            value={store.destination_airport ?? ''}
            onChange={(e) => store.updateForm({ destination_airport: e.target.value, selected_flight: null })}
            className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none border"
            style={{ background: '#F9F6F0', borderColor: '#C5A059', color: '#26170C' }}>
            {SAUDI_AIRPORTS.map((a) => (
              <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
            ))}
          </select>
        </div>
      </div>

      {store.selected_flight ? (
        <div className="rounded-xl p-4 flex items-center gap-4 border"
          style={{ borderColor: '#C5A059', background: '#F9F6F0' }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: '#EAEAD1' }}>✈</div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: '#26170C' }}>
              {store.selected_flight.airlines}
            </p>
            <p className="text-xs" style={{ color: '#735C00' }}>
              {store.selected_flight.departure_time} → {store.selected_flight.arrival_time}
              {' '}• {store.selected_flight.flight_type}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold" style={{ color: '#26170C' }}>
              {formatIDR(store.selected_flight.price_idr * totalPax)}
            </p>
            <p className="text-xs" style={{ color: '#735C00' }}>Termasuk Bagasi 30kg</p>
          </div>
          <button onClick={() => store.setModal('flight')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: '#BA1A2C', color: '#FDFBF7' }}>
            Ganti Pilihan
          </button>
        </div>
      ) : (
        <button onClick={() => store.setModal('flight')}
          className="w-full border-2 border-dashed rounded-xl py-4 text-sm transition-all"
          style={{ borderColor: '#C5A059', color: '#735C00' }}>
          + Pilih Maskapai Penerbangan
        </button>
      )}
    </div>
  )
}