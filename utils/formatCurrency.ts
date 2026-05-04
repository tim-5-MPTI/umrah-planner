// utils/formatCurrency.ts

export const formatIDR = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatSAR = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatCompact = (amount: number): string => {
  if (amount >= 1000000000) return `Rp ${(amount / 1000000000).toFixed(1)} M`
  if (amount >= 1000000) return `Rp ${(amount / 1000000).toFixed(0)} jt`
  if (amount >= 1000) return `Rp ${(amount / 1000).toFixed(0)} rb`
  return formatIDR(amount)
}

export const sarToIdr = (sar: number, rate: number): number => {
  return Math.round(sar * rate)
}