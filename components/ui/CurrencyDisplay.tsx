import type { CurrencyDisplayProps } from '@/lib/types'
import { formatIDR, formatSAR } from '@/utils/formatCurrency'

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-semibold',
  xl: 'text-3xl font-bold',
}

export default function CurrencyDisplay({
  amount,
  currency = 'IDR',
  size = 'md',
  showPrefix = true,
  className = '',
}: CurrencyDisplayProps) {
  const formatted = currency === 'IDR' ? formatIDR(amount) : formatSAR(amount)

  return (
    <span className={`${sizeStyles[size]} ${className}`}>
      {formatted}
    </span>
  )
}