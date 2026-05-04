import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function CtaSection() {
  return (
    <section className="bg-[#2C1810] py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Siap merencanakan Umrah Anda?
        </h2>
        <p className="text-[#C9A96E] text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
          Langkah pertama menuju Baitullah dimulai dengan perencanaan yang tenang dan penuh berkah.
        </p>
        <Link href="/planner">
          <Button variant="secondary" size="lg">
            Mulai Buat Planner
          </Button>
        </Link>
      </div>
    </section>
  )
}