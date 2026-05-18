'use client'

import { usePlannerStore } from '@/store/plannerStore'
import { useHotels } from '@/hooks/useSupabase'
import { formatIDR } from '@/utils/formatCurrency'
import type { Hotel } from '@/lib/types'

export default function HotelListModal() {
  const store = usePlannerStore()
  const isMakkah = store.open_modal === 'hotel-makkah'
  const isOpen = store.open_modal === 'hotel-makkah' || store.open_modal === 'hotel-madinah'
  const city = isMakkah ? 'Makkah' : 'Madinah'
  const { data: hotels, loading } = useHotels(isOpen ? city : null, store.distance_preference)
  const sarRate = 4300

  const handleSelect = (hotel: Hotel) => {
    const room = hotel.rooms?.[0] ?? null
    if (isMakkah) store.updateForm({ selected_hotel_makkah: hotel, selected_room_makkah: room })
    else store.updateForm({ selected_hotel_madinah: hotel, selected_room_madinah: room })
    store.setModal(null)
  }

  const handleDetail = (hotel: Hotel) => {
    store.setHotelForDetail(hotel)
    store.setModal('hotel-detail')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[90vh] flex flex-col shadow-2xl"
        style={{ background: '#FDFBF7' }}>

        {/* Handle bar untuk mobile */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: '#D4CCB0' }} />
        </div>

        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b"
          style={{ borderColor: '#D4CCB0' }}>
          <h2 className="font-semibold text-sm md:text-base" style={{ color: '#26170C' }}>
            Pilih Penginapan Tersedia
          </h2>
          <button onClick={() => store.setModal(null)}
            className="text-xl font-light p-1" style={{ color: '#735C00' }}>×</button>
        </div>

        <div className="flex gap-2 px-4 md:px-6 py-3 border-b flex-wrap" style={{ borderColor: '#D4CCB0' }}>
          {[
            { label: '< 100m', val: 100 },
            { label: '< 500m', val: 500 },
            { label: '< 1km', val: 1000 },
            { label: 'Semua', val: 9999 },
          ].map((f) => (
            <button key={f.val}
              onClick={() => store.updateForm({ distance_preference: f.val })}
              className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
              style={{
                background: store.distance_preference === f.val ? '#26170C' : '#F9F6F0',
                color: store.distance_preference === f.val ? '#FDFBF7' : '#735C00',
                borderColor: '#C5A059',
              }}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 px-4 md:px-6 py-4 space-y-4">
          {loading ? (
            <p className="text-center py-8 text-sm" style={{ color: '#735C00' }}>Memuat hotel...</p>
          ) : hotels.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: '#735C00' }}>
              Tidak ada hotel yang sesuai filter.
            </p>
          ) : (
            hotels.map((hotel: Hotel) => {
              const room = hotel.rooms?.[0]
              const price = room ? Math.round(room.price_per_night * sarRate) : 0
              return (
                <div key={hotel.id} className="rounded-xl border overflow-hidden"
                  style={{ borderColor: '#D4CCB0' }}>
                  <div className="flex gap-3 md:gap-4 p-3 md:p-4">
                    <div className="w-20 h-16 md:w-24 md:h-20 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
                      style={{ background: '#EAEAD1' }}>
                      {hotel.image_url
                        ? <img src={hotel.image_url} alt={hotel.name} className="w-full h-full object-cover" />
                        : <span className="text-2xl md:text-3xl">🏨</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-0.5 mb-1">
                        {'★'.repeat(hotel.star_rating).split('').map((_, i) => (
                          <span key={i} className="text-xs" style={{ color: '#FFE088' }}>★</span>
                        ))}
                      </div>
                      <p className="text-sm font-semibold truncate" style={{ color: '#26170C' }}>{hotel.name}</p>
                      <p className="text-xs" style={{ color: '#735C00' }}>
                        📍 {hotel.distance_to_masjid_m}m dari Masjid {isMakkah ? 'Haram' : 'Nabawi'}
                      </p>
                      {room && (
                        <div className="flex gap-2 md:gap-3 mt-1 text-xs flex-wrap" style={{ color: '#735C00' }}>
                          <span>✓ {room.room_type}</span>
                          <span>✓ {room.adult_capacity} pax</span>
                          <span className="hidden md:inline">✓ Check-in 14:00</span>
                          <span className="hidden md:inline">✓ Check-out 12:00</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-t"
                    style={{ borderColor: '#D4CCB0', background: '#F9F6F0' }}>
                    <div>
                      <p className="text-xs" style={{ color: '#735C00' }}>Mulai dari</p>
                      <p className="text-sm font-bold" style={{ color: '#26170C' }}>
                        {formatIDR(price)}/malam
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleDetail(hotel)}
                        className="px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hidden md:block"
                        style={{ borderColor: '#26170C', color: '#26170C', background: 'transparent' }}>
                        Lihat Detail & Kamar
                      </button>
                      <button onClick={() => handleSelect(hotel)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: '#26170C', color: '#FDFBF7' }}>
                        Pilih
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}