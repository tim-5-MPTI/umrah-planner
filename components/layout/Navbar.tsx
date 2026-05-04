import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8] border-b border-[#E8DFD0]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#3D2B1F]">
            umrah<span className="text-[#C9A96E]">planner</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-[#8B6F5E] hover:text-[#3D2B1F] transition-colors">
            Beranda
          </Link>
          <Link href="/planner" className="text-sm text-[#8B6F5E] hover:text-[#3D2B1F] transition-colors">
            Planner
          </Link>
        </div>

        <Link href="/planner">
          <Button variant="primary" size="sm">
            Mulai Planner
          </Button>
        </Link>
      </div>
    </nav>
  )
}