'use client'

import { useState } from 'react'
import { usePlannerStore } from '@/store/plannerStore'
import { useFlights } from '@/hooks/useSupabase'
import { formatIDR } from '@/utils/formatCurrency'
import type { Flight } from '@/lib/types'

export default function FlightModal() {
  const store = usePlannerStore()
  const { data: flights, loading } = useFlights(store.origin_airport, store.destination_airport)
  const [tab, setTab] = useState<'economy' | 'business'>('economy')
  const totalPax = store.adult_count + store.child_count

  if (store.open_modal !== 'flight') return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl"
        style={{ background: '#FDFBF7' }}>

        <div className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: '#D4CCB0' }}>
          <h2 className="font-semibold" style={{ color: '#26170C' }}>Pilih Maskapai Tersedia</h2>
          <button onClick={() => store.setModal(null)}
            className="text-xl font-light" style={{ color: '#735C00' }}>×</button>
        </div>

        <div className="flex gap-2 px-6 py-3 border-b" style={{ borderColor: '#D4CCB0' }}>
          {(['economy', 'business'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: tab === t ? '#26170C' : '#EAEAD1',
                color: tab === t ? '#FDFBF7' : '#735C00',
              }}>
              {t === 'economy' ? 'Economy' : 'Business'}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-3">
          {loading ? (
            <p className="text-center py-8 text-sm" style={{ color: '#735C00' }}>Memuat penerbangan...</p>
          ) : flights.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: '#735C00' }}>
              Tidak ada penerbangan untuk rute ini.
            </p>
          ) : (
            flights.map((flight: Flight) => {
              const isSelected = store.selected_flight?.id === flight.id
              return (
                <div key={flight.id}
                  className="rounded-xl p-4 flex items-center gap-4 border transition-all"
                  style={{
                    borderColor: isSelected ? '#735C00' : '#D4CCB0',
                    background: isSelected ? '#FBFBE2' : '#F9F6F0',
                  }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                    style={{ background: '#EAEAD1' }}>
                    {flight.airlines.toLowerCase().includes('garuda') ? (
                    <img src="/images/airlines/garuda-indonesia-logo.png" alt="Garuda" className="w-8 h-8 object-contain" />
                    ) : flight.airlines.toLowerCase().includes('emirates') ? (
                    <img src="/images/airlines/emirates-logo.png" alt="Emirates" className="w-8 h-8 object-contain" />
                    ) : (
                    <span className="text-lg">✈</span>
                    )}
                    </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: '#26170C' }}>
                      {flight.airlines}
                    </p>
                    <p className="text-xs" style={{ color: '#735C00' }}>
                      {flight.departure_time} → {flight.arrival_time} • {flight.flight_type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: '#26170C' }}>
                      {formatIDR(flight.price_idr * totalPax)}
                    </p>
                    <p className="text-xs" style={{ color: '#735C00' }}>Termasuk Bagasi 30kg</p>
                  </div>
                  <button
                    onClick={() => { store.updateForm({ selected_flight: flight }); store.setModal(null) }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: isSelected ? '#735C00' : '#26170C', color: '#FDFBF7' }}>
                    {isSelected ? 'Dipilih' : 'Pilih'}
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}