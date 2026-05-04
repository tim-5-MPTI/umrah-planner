// lib/utils.ts

import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}

export const getTotalNights = (
  departure: string | null,
  returnDate: string | null
): number => {
  if (!departure || !returnDate) return 0
  const diff =
    new Date(returnDate).getTime() - new Date(departure).getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const getStarRating = (stars: number): string => {
  return '★'.repeat(stars) + '☆'.repeat(5 - stars)
}

export const getDistanceLabel = (meters: number): string => {
  if (meters < 1000) return `${meters} m dari Masjid`
  return `${(meters / 1000).toFixed(1)} km dari Masjid`
}