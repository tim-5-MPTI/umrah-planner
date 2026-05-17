import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#FDFBF7' }}
    >
      {/* Foto Ka'bah background */}
      <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none">
        <img
          src="/images/kakbah.png"
          alt="Ka'bah"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.25 }}
        />
        {/* Gradient overlay kiri */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, #FDFBF7 0%, rgba(253,251,247,0.5) 50%, rgba(253,251,247,0) 100%)'
        }} />
      </div>

      {/* Gradient overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(253,251,247,0) 0%, rgba(253,251,247,0.4) 50%, #FDFBF7 100%)'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-widest uppercase mb-6"
            style={{ color: '#735C00' }}>
            Umrah Planner
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: '#26170C' }}>
            Umrah Mandiri Jadi{' '}
            <span style={{ color: '#735C00' }}>Lebih Mudah</span>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-lg"
            style={{ color: '#3D2B1F', opacity: 0.7 }}>
            Rencanakan perjalanan, hitung biaya, dan pahami aturan visa
            — semua dalam satu tempat yang tenang dan teratur.
          </p>
          <Link href="/planner">
            <button
              className="px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:opacity-90 flex items-center gap-2"
              style={{ background: '#26170C', color: '#FDFBF7' }}
            >
              Mulai Buat Planner →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}