export default function LoadingSpinner({
  size = 'md',
  text,
}: {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}) {
  const sizeMap = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeMap[size]} border-4 border-[#E8DFD0] border-t-[#C9A96E] rounded-full animate-spin`}
      />
      {text && <p className="text-sm text-[#8B6F5E]">{text}</p>}
    </div>
  )
}