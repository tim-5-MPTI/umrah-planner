import type { AlertBannerProps } from '@/lib/types'

const styles = {
  error: {
    wrapper: 'bg-red-50 border-red-200',
    icon: '✕',
    iconBg: 'bg-red-100 text-red-600',
    title: 'text-red-800',
    message: 'text-red-600',
  },
  warning: {
    wrapper: 'bg-yellow-50 border-yellow-200',
    icon: '!',
    iconBg: 'bg-yellow-100 text-yellow-600',
    title: 'text-yellow-800',
    message: 'text-yellow-600',
  },
  success: {
    wrapper: 'bg-green-50 border-green-200',
    icon: '✓',
    iconBg: 'bg-green-100 text-green-600',
    title: 'text-green-800',
    message: 'text-green-600',
  },
  info: {
    wrapper: 'bg-blue-50 border-blue-200',
    icon: 'i',
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'text-blue-800',
    message: 'text-blue-600',
  },
}

export default function AlertBanner({
  type,
  title,
  message,
  onClose,
}: AlertBannerProps) {
  const s = styles[type]

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${s.wrapper}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${s.iconBg}`}>
        {s.icon}
      </div>
      <div className="flex-1">
        <p className={`font-medium text-sm ${s.title}`}>{title}</p>
        <p className={`text-sm mt-0.5 ${s.message}`}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  )
}