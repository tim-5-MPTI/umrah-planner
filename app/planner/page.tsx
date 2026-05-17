'use client'

import Link from 'next/link'
import BudgetSection from '@/components/planner/sections/BudgetSection'
import DateDurationSection from '@/components/planner/sections/DateDurationSection'
import TransportMealSection from '@/components/planner/sections/TransportMealSection'
import FlightSection from '@/components/planner/sections/FlightSection'
import HotelSection from '@/components/planner/sections/HotelSection'
import SummaryPanel from '@/components/planner/SummaryPanel'
import FlightModal from '@/components/planner/modals/FlightModal'
import HotelListModal from '@/components/planner/modals/HotelListModal'
import HotelDetailModal from '@/components/planner/modals/HotelDetailModal'
import JamaahSection from '@/components/planner/sections/JamaahSection'

export default function PlannerPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FDFBF7' }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-70 transition-opacity"
          style={{ color: '#735C00' }}
        >
          ← Kembali
        </Link>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest font-medium mb-2"
            style={{ color: '#735C00' }}>
            Perencanaan Umum
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: '#26170C' }}>
            Rencanakan Perjalanan Suci
            <br />
            <span style={{ color: '#735C00', fontStyle: 'italic' }}>
              Dengan Ketenangan
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <BudgetSection />
            <DateDurationSection />
            <JamaahSection />
            <TransportMealSection />
            <FlightSection />
            <HotelSection city="Makkah" />
            <HotelSection city="Madinah" />
          </div>
          <div className="lg:col-span-1">
            <SummaryPanel />
          </div>
        </div>
      </div>

      <FlightModal />
      <HotelListModal />
      <HotelDetailModal />
    </div>
  )
}