import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] bg-[#F5F0E8] flex items-center overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[url('/masjid.png')] bg-contain bg-no-repeat bg-right-top" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="max-w-xl">
          <p className="text-sm text-[#8B6F5E] font-medium mb-4 tracking-wide uppercase">
            Umrah Planner
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D2B1F] leading-tight mb-6">
            Umrah Mandiri Jadi{' '}
            <span className="text-[#C9A96E]">Lebih Mudah</span>
          </h1>
          <p className="text-[#8B6F5E] text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Rencanakan perjalanan, hitung biaya, dan pahami aturan visa
            — semua dalam satu tempat yang tenang dan teratur.
          </p>
          <Link href="/planner">
            <Button variant="primary" size="lg">
              Mulai Buat Planner →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}