'use client'

import { usePlannerStore } from '@/store/plannerStore'
import { formatIDR } from '@/utils/formatCurrency'
import type { Room } from '@/lib/types'

export default function HotelDetailModal() {
  const store = usePlannerStore()
  const hotel = store.hotel_for_detail
  const isMakkah = hotel?.city === 'Makkah'
  const sarRate = 4300

  const handleSelectRoom = (room: Room) => {
    if (isMakkah) {
      store.updateForm({ selected_hotel_makkah: hotel, selected_room_makkah: room })
    } else {
      store.updateForm({ selected_hotel_madinah: hotel, selected_room_madinah: room })
    }
    store.setModal(null)
    store.setHotelForDetail(null)
  }

  if (store.open_modal !== 'hotel-detail' || !hotel) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl"
        style={{ background: '#FDFBF7' }}>

        {/* Hotel image header */}
        <div className="relative">
          <div className="h-44 rounded-t-2xl overflow-hidden flex items-center justify-center"
            style={{ background: '#EAEAD1' }}>
            {hotel.image_url
              ? <img src={hotel.image_url} alt={hotel.name} className="w-full h-full object-cover" />
              : <span className="text-6xl">🏨</span>
            }
          </div>
          <button
            onClick={() => {
              store.setModal(isMakkah ? 'hotel-makkah' : 'hotel-madinah')
              store.setHotelForDetail(null)
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow font-light text-xl"
            style={{ background: '#FDFBF7', color: '#26170C' }}
          >×</button>
        </div>

        {/* Hotel info */}
        <div className="px-6 py-4 border-b" style={{ borderColor: '#D4CCB0' }}>
          <div className="flex gap-0.5 mb-1">
            {'★'.repeat(hotel.star_rating).split('').map((_, i) => (
              <span key={i} className="text-sm" style={{ color: '#FFE088' }}>★</span>
            ))}
          </div>
          <h2 className="font-bold text-lg" style={{ color: '#26170C' }}>{hotel.name}</h2>
          <p className="text-xs mt-0.5" style={{ color: '#735C00' }}>
            📍 {hotel.distance_to_masjid_m}m dari Masjid {isMakkah ? 'Haram' : 'Nabawi'}
          </p>
          <div className="flex gap-4 mt-3 flex-wrap">
            {['📶 High-Speed Wifi', '🍳 Breakfast Included', '❄️ Air Conditioning', '🔔 24/7 Room Service'].map((a, i) => (
              <span key={i} className="text-xs" style={{ color: '#735C00' }}>{a}</span>
            ))}
          </div>
        </div>

        {/* Rooms list */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          <h3 className="font-semibold mb-3" style={{ color: '#26170C' }}>Available Rooms</h3>
          <div className="space-y-3">
            {(hotel.rooms ?? []).map((room: Room) => {
              const price = Math.round(room.price_per_night * sarRate)
              const isSelected =
                store.selected_room_makkah?.id === room.id ||
                store.selected_room_madinah?.id === room.id

              return (
                <div
                  key={room.id}
                  className="rounded-xl p-4 flex items-center justify-between border"
                  style={{
                    borderColor: isSelected ? '#735C00' : '#D4CCB0',
                    background: isSelected ? '#FBFBE2' : '#F9F6F0',
                  }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#26170C' }}>
                      {room.room_type} Room
                    </p>
                    <div className="flex gap-3 mt-1 text-xs" style={{ color: '#735C00' }}>
                      <span>👥 {room.adult_capacity} Adults Capacity</span>
                      <span>🛏 {room.adult_capacity} King Bed</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: '#735C00' }}>Price Per Night</p>
                    <p className="text-sm font-bold" style={{ color: '#26170C' }}>
                      {formatIDR(price)}
                    </p>
                    <button
                      onClick={() => handleSelectRoom(room)}
                      className="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        background: isSelected ? '#735C00' : '#26170C',
                        color: '#FDFBF7',
                      }}
                    >
                      {isSelected ? 'Dipilih' : 'Pilih Kamar ini'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}