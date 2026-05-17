'use client'

import { usePlannerStore } from '@/store/plannerStore'
import { formatIDR } from '@/utils/formatCurrency'

export default function HotelSection({ city }: { city: 'Makkah' | 'Madinah' }) {
  const store = usePlannerStore()
  const isMakkah = city === 'Makkah'
  const hotel = isMakkah ? store.selected_hotel_makkah : store.selected_hotel_madinah
  const room = isMakkah ? store.selected_room_makkah : store.selected_room_madinah
  const sarRate = 4300
  const pricePerNight = room ? Math.round(room.price_per_night * sarRate) : 0

  return (
    <div className="rounded-2xl border p-5 space-y-4"
      style={{ background: '#FDFBF7', borderColor: '#C5A059' }}>
      <div className="flex items-center gap-2">
        <span>🏨</span>
        <h2 className="font-semibold" style={{ color: '#26170C' }}>Pilihan Hotel {city}</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs uppercase tracking-wide font-medium block mb-1"
            style={{ color: '#735C00' }}>Lokasi / Masjid</label>
          <select className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none border"
            style={{ background: '#F9F6F0', borderColor: '#C5A059', color: '#26170C' }}>
            <option>{isMakkah ? 'Masjidil Haram (Makkah)' : 'Masjid Nabawi (Madinah)'}</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide font-medium block mb-1"
            style={{ color: '#735C00' }}>Preferensi Jarak</label>
          <select
            onChange={(e) => store.updateForm({ distance_preference: parseInt(e.target.value) })}
            className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none border"
            style={{ background: '#F9F6F0', borderColor: '#C5A059', color: '#26170C' }}>
            <option value="">Jarak dari Masjid</option>
            <option value="100">Terdekat (&lt; 100m)</option>
            <option value="500">Dekat (&lt; 500m)</option>
            <option value="1000">Terjangkau (&lt; 1km)</option>
            <option value="9999">Semua Jarak</option>
          </select>
        </div>
      </div>

      {hotel && room ? (
        <div className="rounded-xl p-4 flex gap-4 border"
          style={{ borderColor: '#C5A059', background: '#F9F6F0' }}>
          <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
            style={{ background: '#EAEAD1' }}>
            {hotel.image_url
              ? <img src={hotel.image_url} alt={hotel.name} className="w-full h-full object-cover" />
              : <span className="text-3xl">🏨</span>
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
              {city} • {hotel.distance_to_masjid_m}m dari Masjid
            </p>
            <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: '#735C00' }}>
              <span>✓ {room.room_type} ({room.adult_capacity} pax)</span>
              <span>✓ Check-in 14:00</span>
            </div>
            <p className="text-sm font-bold mt-2" style={{ color: '#26170C' }}>
              {formatIDR(pricePerNight)}/malam
            </p>
          </div>
          <button
            onClick={() => store.setModal(isMakkah ? 'hotel-makkah' : 'hotel-madinah')}
            className="self-start px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap"
            style={{ background: '#BA1A2C', color: '#FDFBF7' }}>
            Ganti Pilihan
          </button>
        </div>
      ) : (
        <button
          onClick={() => store.setModal(isMakkah ? 'hotel-makkah' : 'hotel-madinah')}
          className="w-full border-2 border-dashed rounded-xl py-4 text-sm transition-all"
          style={{ borderColor: '#C5A059', color: '#735C00' }}>
          + Pilih Hotel {city}
        </button>
      )}
    </div>
  )
}