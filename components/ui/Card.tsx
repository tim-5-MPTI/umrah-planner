import type { CardProps } from '@/lib/types'

export default function Card({
  children,
  className = '',
  onClick,
  selected = false,
  hoverable = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl border transition-all duration-200
        ${selected
          ? 'border-[#C9A96E] ring-2 ring-[#C9A96E] ring-opacity-30'
          : 'border-[#E8DFD0]'
        }
        ${hoverable || onClick
          ? 'cursor-pointer hover:border-[#C9A96E] hover:shadow-md'
          : ''
        }
        ${className}
      `}
    >
      {children}
    </div>
  )
}