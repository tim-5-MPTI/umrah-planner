import type { ButtonProps } from '@/lib/types'

const variantStyles = {
  primary: 'bg-[#3D2B1F] text-white hover:bg-[#2C1810] border-transparent',
  secondary: 'bg-[#C9A96E] text-[#3D2B1F] hover:bg-[#E8D5A3] border-transparent',
  outline: 'bg-transparent text-[#3D2B1F] border-[#3D2B1F] hover:bg-[#3D2B1F] hover:text-white',
  ghost: 'bg-transparent text-[#8B6F5E] hover:bg-[#E8DFD0] border-transparent',
  danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] border-transparent',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  children,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg border transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}