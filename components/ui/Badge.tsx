import type { BadgeProps } from '@/lib/types'

const variantStyles = {
  default: 'bg-[#E8DFD0] text-[#3D2B1F]',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  gold: 'bg-[#C9A96E] text-[#3D2B1F]',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export default function Badge({
  label,
  variant = 'default',
  size = 'sm',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
    >
      {label}
    </span>
  )
}