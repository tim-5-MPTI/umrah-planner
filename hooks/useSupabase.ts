// hooks/useSupabase.ts

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import type {
  SystemConstant,
  Flight,
  Hotel,
  DateRecommendation,
} from '@/lib/types'

// ── Fetch system constants ───────────────────
export const useConstants = () => {
  const [data, setData] = useState<SystemConstant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('system_constants')
        .select('*')

      if (error) setError(error.message)
      else setData(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { data, loading, error }
}

// ── Fetch flights by route ───────────────────
export const useFlights = (
  origin: string | null,
  destination: string | null
) => {
  const [data, setData] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!origin || !destination) return

    const fetch = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .eq('origin_airport', origin)
        .eq('destination_airport', destination)
        .order('price_idr', { ascending: true })

      if (error) setError(error.message)
      else setData(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [origin, destination])

  return { data, loading, error }
}

// ── Fetch hotels by city ─────────────────────
export const useHotels = (
  city: 'Makkah' | 'Madinah' | null,
  maxDistance?: number | null
) => {
  const [data, setData] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!city) return

    const fetch = async () => {
      setLoading(true)
      const supabase = createClient()

      let query = supabase
        .from('hotels')
        .select('*, rooms(*)')
        .eq('city', city)
        .order('distance_to_masjid_m', { ascending: true })

      if (maxDistance) {
        query = query.lte('distance_to_masjid_m', maxDistance)
      }

      const { data, error } = await query

      if (error) setError(error.message)
      else setData(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [city, maxDistance])

  return { data, loading, error }
}

// ── Fetch date recommendations ───────────────
export const useDateRecommendations = () => {
  const [data, setData] = useState<DateRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('date_recommendations')
        .select('*')
        .order('start_date', { ascending: true })

      if (error) setError(error.message)
      else setData(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [])

  return { data, loading, error }
}