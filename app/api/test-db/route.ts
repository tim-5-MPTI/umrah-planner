// app/api/test-db/route.ts

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { calculateBudget, constantsToRecord } from '@/lib/calculator'
import { getTotalNights } from '@/lib/utils'
import { formatIDR, sarToIdr } from '@/utils/formatCurrency'
import { BUDGET_PRESETS, TRANSPORT_OPTIONS, MEAL_OPTIONS } from '@/constants/budgetPresets'
import { INDONESIAN_AIRPORTS, SAUDI_AIRPORTS } from '@/constants/airports'

export async function GET() {
  const results: Record<string, any> = {}

  // ── 1. Cek koneksi Supabase & semua tabel ──
  try {
    const supabase = await createClient()

    const [constants, flights, hotels, rooms, dates] = await Promise.all([
      supabase.from('system_constants').select('*'),
      supabase.from('flights').select('*'),
      supabase.from('hotels').select('*, rooms(*)'),
      supabase.from('rooms').select('*'),
      supabase.from('date_recommendations').select('*'),
    ])

    results.database = {
      status: 'OK',
      tables: {
        system_constants: {
          count: constants.data?.length ?? 0,
          error: constants.error?.message ?? null,
          sample: constants.data?.slice(0, 3).map(c => `${c.key_name}: ${c.value}`) ?? [],
        },
        flights: {
          count: flights.data?.length ?? 0,
          error: flights.error?.message ?? null,
          sample: flights.data?.slice(0, 2).map(f => `${f.airlines} ${f.origin_airport}→${f.destination_airport} Rp${f.price_idr.toLocaleString()}`) ?? [],
        },
        hotels: {
          count: hotels.data?.length ?? 0,
          error: hotels.error?.message ?? null,
          makkah: hotels.data?.filter(h => h.city === 'Makkah').length ?? 0,
          madinah: hotels.data?.filter(h => h.city === 'Madinah').length ?? 0,
        },
        rooms: {
          count: rooms.data?.length ?? 0,
          error: rooms.error?.message ?? null,
        },
        date_recommendations: {
          count: dates.data?.length ?? 0,
          error: dates.error?.message ?? null,
          sample: dates.data?.map(d => d.name) ?? [],
        },
      },
    }

    // ── 2. Cek Calculator Engine ──
    if (constants.data && constants.data.length > 0) {
      const constantsRecord = constantsToRecord(constants.data)
      const sampleFlight = flights.data?.[0] ?? null
      const sampleRoomMakkah = rooms.data?.find(r => r.room_type === 'Double') ?? null
      const sampleRoomMadinah = rooms.data?.find(r => r.room_type === 'Triple') ?? null

      const breakdown = calculateBudget({
        budget_amount: 50000000,
        is_no_limit: false,
        adult_count: 2,
        child_count: 1,
        total_pax: 3,
        selected_flight: sampleFlight,
        selected_transport: 'bus',
        selected_meal: 'catering',
        selected_room_makkah: sampleRoomMakkah,
        selected_room_madinah: sampleRoomMadinah,
        nights_makkah: 4,
        nights_madinah: 4,
        constants: constantsRecord,
      })

      results.calculator = {
        status: 'OK',
        test_scenario: '2 dewasa + 1 anak, budget Rp 50jt, bus, catering, 4 malam each',
        breakdown: {
          visa: formatIDR(breakdown.fixed.visa),
          meningitis: formatIDR(breakdown.fixed.meningitis),
          transport: formatIDR(breakdown.fixed.transport),
          meal: formatIDR(breakdown.fixed.meal),
          flight: formatIDR(breakdown.fixed.flight),
          hotel_makkah: formatIDR(breakdown.dynamic.hotel_makkah),
          hotel_madinah: formatIDR(breakdown.dynamic.hotel_madinah),
          total_fixed: formatIDR(breakdown.total_fixed),
          total_dynamic: formatIDR(breakdown.total_dynamic),
          TOTAL: formatIDR(breakdown.total),
          sisa_dana: breakdown.remaining_budget !== null
            ? formatIDR(breakdown.remaining_budget)
            : 'N/A',
          is_sufficient: breakdown.is_sufficient,
        },
      }
    } else {
      results.calculator = { status: 'SKIP', reason: 'system_constants kosong' }
    }
  } catch (err: any) {
    results.database = { status: 'ERROR', message: err.message }
  }

  // ── 3. Cek Utils ──
  try {
    results.utils = {
      status: 'OK',
      getTotalNights: getTotalNights('2026-10-12', '2026-10-24') + ' malam',
      formatIDR: formatIDR(28500000),
      sarToIdr: formatIDR(sarToIdr(800, 4300)) + ' (800 SAR)',
    }
  } catch (err: any) {
    results.utils = { status: 'ERROR', message: err.message }
  }

  // ── 4. Cek Constants ──
  try {
    results.constants = {
      status: 'OK',
      budget_presets: BUDGET_PRESETS.length + ' preset',
      transport_options: TRANSPORT_OPTIONS.length + ' opsi',
      meal_options: MEAL_OPTIONS.length + ' opsi',
      airports_indonesia: INDONESIAN_AIRPORTS.length + ' bandara',
      airports_saudi: SAUDI_AIRPORTS.length + ' bandara',
    }
  } catch (err: any) {
    results.constants = { status: 'ERROR', message: err.message }
  }

  // ── 5. Cek Zustand Store (tidak bisa di server, skip) ──
  results.store = {
    status: 'SKIP',
    reason: 'Zustand store hanya bisa dicek di browser (client-side)',
    instruction: 'Buka browser console dan ketik: usePlannerStore.getState()',
  }

  return NextResponse.json(results, { status: 200 })
}