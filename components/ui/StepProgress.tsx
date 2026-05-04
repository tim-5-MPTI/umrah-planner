import type { StepProgressProps } from '@/lib/types'

export default function StepProgress({
  currentStep,
  totalSteps,
  labels = [],
}: StepProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1
          const isCompleted = stepNum < currentStep
          const isActive = stepNum === currentStep

          return (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-300
                    ${isCompleted
                      ? 'bg-[#C9A96E] text-white'
                      : isActive
                        ? 'bg-[#3D2B1F] text-white'
                        : 'bg-[#E8DFD0] text-[#8B6F5E]'
                    }
                  `}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                {labels[i] && (
                  <span
                    className={`text-xs mt-1 text-center max-w-[80px] leading-tight
                      ${isActive ? 'text-[#3D2B1F] font-medium' : 'text-[#8B6F5E]'}
                    `}
                  >
                    {labels[i]}
                  </span>
                )}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-300
                    ${isCompleted ? 'bg-[#C9A96E]' : 'bg-[#E8DFD0]'}
                  `}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}