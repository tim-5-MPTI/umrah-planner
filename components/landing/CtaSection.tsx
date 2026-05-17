import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="py-20" style={{ background: '#26170C' }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FDFBF7' }}>
          Siap merencanakan Umrah Anda?
        </h2>
        <p className="text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed"
          style={{ color: '#FFE088' }}>
          Langkah pertama menuju Baitullah dimulai dengan perencanaan yang tenang dan penuh berkah.
        </p>
        <Link href="/planner">
          <button
            className="px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:opacity-90"
            style={{ background: '#FFE088', color: '#26170C' }}
          >
            Mulai Buat Planner
          </button>
        </Link>
      </div>
    </section>
  )
}