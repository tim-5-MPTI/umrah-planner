'use client'

import { useRouter } from 'next/navigation'
import { usePlannerStore } from '@/store/plannerStore'
import { useConstants } from '@/hooks/useSupabase'
import { useCalculator } from '@/hooks/useCalculator'
import { useExportPdf } from '@/hooks/useExportPdf'
import { formatIDR } from '@/utils/formatCurrency'
import { formatDate } from '@/lib/utils'
import { TRANSPORT_OPTIONS, MEAL_OPTIONS } from '@/constants/budgetPresets'
import PdfTemplate from '@/components/result/PdfTemplate'

export default function ResultPage() {
  const router = useRouter()
  const store = usePlannerStore()
  const { data: constants } = useConstants()
  const breakdown = useCalculator(constants)
  const { exportPdf, loading: pdfLoading } = useExportPdf()

  const totalPax = store.adult_count + store.child_count
  const transportLabel = TRANSPORT_OPTIONS.find(t => t.value === store.selected_transport)?.label ?? '-'
  const mealLabel = MEAL_OPTIONS.find(m => m.value === store.selected_meal)?.label ?? '-'
  const isOverBudget = breakdown?.is_sufficient === false
  const totalHotel = breakdown
    ? breakdown.dynamic.hotel_makkah + breakdown.dynamic.hotel_madinah
    : 0

  const costItems = [
    {
      icon: '✈️',
      category: 'PENERBANGAN',
      label: store.selected_flight?.airlines ?? 'Belum dipilih',
      sub: store.selected_flight
        ? `${store.origin_airport} → ${store.destination_airport} • ${store.selected_flight.flight_type}`
        : '-',
      amount: breakdown?.fixed.flight ?? 0,
    },
    {
      icon: '🏨',
      category: 'HOTEL',
      label: store.selected_hotel_makkah?.name ?? 'Belum dipilih',
      sub: `${store.nights_makkah} Malam Makkah + ${store.nights_madinah} Malam Madinah`,
      amount: totalHotel,
    },
    {
      icon: '🚌',
      category: 'TRANSPORTASI LOKAL',
      label: transportLabel,
      sub: 'Jeddah • Makkah • Madinah',
      amount: breakdown?.fixed.transport ?? 0,
    },
    {
      icon: '🍽️',
      category: 'KONSUMSI',
      label: mealLabel,
      sub: 'Makkah • Madinah',
      amount: breakdown?.fixed.meal ?? 0,
    },
    {
      icon: '🪪',
      category: 'KESEHATAN & ASURANSI',
      label: 'Visa & Vaksin Meningitis',
      sub: `Total Biaya ${totalPax} Orang`,
      amount: breakdown ? breakdown.fixed.visa + breakdown.fixed.meningitis : 0,
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#FDFBF7' }}>

      {/* Hidden PDF template */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -9999,
        opacity: 0.01,
        pointerEvents: 'none',
        width: '794px',
      }}>
        <PdfTemplate form={store} breakdown={breakdown} />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">

        {/* Header dark card */}
        <div className="rounded-3xl p-5 md:p-8 mb-6 relative overflow-hidden"
          style={{ background: '#26170C' }}>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-9xl opacity-10 select-none">
            🕋
          </div>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#D4CCB0' }}>
              Ringkasan Perjalanan Anda
            </p>
            <p className="text-xs md:text-sm mb-1" style={{ color: '#D4CCB0' }}>
              Estimasi Total Perjalanan
            </p>
            {/* FIX: break-all + responsive font size agar angka tidak terpotong di mobile */}
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 break-all" style={{ color: '#FDFBF7' }}>
              {breakdown ? formatIDR(breakdown.total) : 'Rp 0'}
            </p>

           {isOverBudget && breakdown && (
              <div className="flex flex-wrap items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium mb-4 w-fit"
                style={{ background: 'rgba(255,218,214,0.2)', border: '1px solid #FFDAD6', color: '#FFDAD6' }}>
                ⚠ Melebihi target budget {formatIDR(store.budget_amount ?? 0)}
              </div>
            )}

            <div className="flex items-center gap-2 md:gap-3 flex-wrap mt-4">
              {[
                { label: store.origin_airport ?? 'CGK', sub: 'Jakarta' },
                { label: '→', sub: '' },
                { label: store.destination_airport ?? 'JED', sub: 'Jeddah' },
                { label: '→', sub: '' },
                { label: 'Makkah', sub: `${store.nights_makkah} Malam` },
                { label: '→', sub: '' },
                { label: 'Madinah', sub: `${store.nights_madinah} Malam` },
                { label: '→', sub: '' },
                { label: store.origin_airport ?? 'CGK', sub: 'Jakarta' },
              ].map((item, i) =>
                item.label === '→'
                  ? <span key={i} style={{ color: '#D4CCB0' }}>→</span>
                  : (
                    <div key={i} className="text-center">
                      <p className="text-xs md:text-sm font-semibold" style={{ color: '#FDFBF7' }}>{item.label}</p>
                      {item.sub && <p className="text-xs" style={{ color: '#D4CCB0' }}>{item.sub}</p>}
                    </div>
                  )
              )}
            </div>

            <div className="flex gap-4 md:gap-6 mt-4 flex-wrap">
              {store.budget_amount && (
                <span className="text-xs" style={{ color: '#D4CCB0' }}>
                  💰 {store.is_no_limit ? 'Tanpa Limit' : formatIDR(store.budget_amount)}
                </span>
              )}
              {store.departure_date && (
                <span className="text-xs" style={{ color: '#D4CCB0' }}>
                  📅 {formatDate(store.departure_date)}
                </span>
              )}
              {store.return_date && (
                <span className="text-xs" style={{ color: '#D4CCB0' }}>
                  📅 {formatDate(store.return_date)}
                </span>
              )}
              <span className="text-xs" style={{ color: '#D4CCB0' }}>👥 {totalPax} Orang</span>
            </div>
          </div>
        </div>

        {/* Two column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="font-bold text-lg md:text-xl mb-1" style={{ color: '#26170C' }}>
                Rincian Biaya
              </h2>
              <p className="text-sm" style={{ color: '#735C00' }}>
                Berikut adalah biaya perjalanan yang telah kami rencanakan untuk Anda
              </p>
            </div>

            {costItems.map((item, i) => (
              <div key={i} className="rounded-2xl p-4 md:p-5 flex items-center justify-between border"
                style={{ background: '#F9F6F0', borderColor: '#D4CCB0' }}>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-lg md:text-xl flex-shrink-0"
                    style={{ background: '#EAEAD1' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide mb-0.5"
                      style={{ color: '#735C00' }}>{item.category}</p>
                    <p className="text-sm font-semibold" style={{ color: '#26170C' }}>{item.label}</p>
                    <p className="text-xs" style={{ color: '#735C00' }}>{item.sub}</p>
                  </div>
                </div>
                <p className="text-sm md:text-base font-bold flex-shrink-0 ml-2" style={{ color: '#26170C' }}>
                  {formatIDR(item.amount)}
                </p>
              </div>
            ))}

            {/* Doa */}
            <div className="rounded-2xl p-5 md:p-6 text-center"
              style={{ background: '#FBFBE2', border: '1px solid #C5A059' }}>
              <p className="text-xl md:text-2xl mb-2" style={{ color: '#26170C', fontFamily: 'serif' }}>
                تَقَبَّلَ اللّٰهُ مِنَّا وَمِنْكُمْ
              </p>
              <p className="text-xs italic mb-3" style={{ color: '#735C00' }}>
                "Semoga Allah menerima (ibadah) dari kami dan dari kamu"
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#735C00' }}>
                Semoga Allah memudahkan setiap langkah perjalanan ibadah Anda. Aamiin Yaa Rabb.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{ background: '#26170C' }}>
              <p className="text-xs uppercase tracking-wide mb-4" style={{ color: '#D4CCB0' }}>
                Ringkasan Dana
              </p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: '#D4CCB0' }}>Total Budget</span>
                  <span className="text-xs font-semibold" style={{ color: '#FDFBF7' }}>
                    {store.is_no_limit ? 'Tanpa Limit' : formatIDR(store.budget_amount ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: '#D4CCB0' }}>Total Pengeluaran</span>
                  <span className="text-xs font-semibold" style={{ color: '#FDFBF7' }}>
                    {breakdown ? formatIDR(breakdown.total) : '-'}
                  </span>
                </div>
                <div className="border-t pt-3" style={{ borderColor: '#3D2B1F' }}>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: '#D4CCB0' }}>Sisa Dana</span>
                    <span className="text-sm font-bold"
                      style={{ color: isOverBudget ? '#FFDAD6' : '#91F78E' }}>
                      {store.is_no_limit
                        ? 'N/A'
                        : breakdown?.remaining_budget !== null && breakdown?.remaining_budget !== undefined
                          ? formatIDR(breakdown.remaining_budget)
                          : '-'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5"
              style={{ background: '#F9F6F0', border: '1px solid #C5A059' }}>
              <p className="text-sm font-semibold mb-3" style={{ color: '#26170C' }}>
                💡 Hal Penting Visa
              </p>
              <div className="space-y-2">
                {[
                  'Minta sertifikat meningitis sebelum berangkat dari dokter',
                  'Foto 4×6 background putih (40% muka)',
                  'Visa hanya berlaku untuk ibadah umrah saja',
                  'Siapkan asuransi perjalanan sesuai standar Saudi',
                ].map((note, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(145,247,142,0.1)', border: '1px solid #91F78E' }}>
                      <span className="text-xs" style={{ color: '#41A356' }}>✓</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#735C00' }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => exportPdf({
                form: store as any,
                breakdown: breakdown!,
                generated_at: new Date().toISOString()
              })}
              disabled={pdfLoading || !breakdown}
              className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: '#26170C', color: '#FFE088' }}>
              {pdfLoading ? '⏳ Memproses...' : '⬇ Download Planner (PDF)'}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-2.5 rounded-xl text-xs font-medium border"
                style={{ borderColor: '#C5A059', color: '#26170C', background: '#F9F6F0' }}>
                🔗 Salin Link
              </button>
              <button className="py-2.5 rounded-xl text-xs font-medium border"
                style={{ borderColor: '#C5A059', color: '#26170C', background: '#F9F6F0' }}>
                💬 WhatsApp
              </button>
            </div>

            <button
              onClick={() => router.push('/planner')}
              className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{ background: '#FFE088', color: '#26170C' }}>
              Kembali ke Halaman Utama
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}