import Link from 'next/link'

const features = [
  {
    icon: '✓',
    title: 'Transparansi Biaya',
    desc: 'Tidak ada biaya tersembunyi. Setiap komponen biaya dipecah secara mendetail.',
    bg: '#FDFBF7',
    iconBg: '#FFE088',
  },
  {
    icon: '📋',
    title: 'Edukasi Visa',
    desc: 'Panduan lengkap dan up-to-date untuk proses pengajuan visa umrah mandiri.',
    bg: '#FDC39A',
    iconBg: '#FFE088',
  },
  {
    icon: '📄',
    title: 'Export PDF',
    desc: 'Bawa rencana perjalanan Anda kemana saja dalam format PDF yang rapi.',
    bg: '#EAEAD1',
    iconBg: '#FFE088',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20" style={{ background: '#EAEAD1' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-10" style={{ color: '#26170C' }}>
          Fitur Utama Untuk Sakinah Anda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main feature card */}
          <div
            className="md:row-span-2 rounded-2xl p-8 flex flex-col justify-end min-h-[280px] relative overflow-hidden"
            style={{ background: '#26170C' }}
          >
            <div className="absolute top-6 left-6 opacity-10 text-8xl" style={{ color: '#FFE088' }}>✦</div>
            <div className="absolute top-10 right-8 opacity-10 text-6xl" style={{ color: '#FFE088' }}>✦</div>
            <div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#FDFBF7' }}>
                Umrah Budget Planner
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#FFE088' }}>
                Kalkulator cerdas yang menyesuaikan dengan gaya perjalanan Anda, dari ekonomis hingga premium.
              </p>
              <Link href="/planner">
                <button
                  className="px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: '#FFE088', color: '#26170C' }}
                >
                  Coba Sekarang →
                </button>
              </Link>
            </div>
          </div>

          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 border"
              style={{ background: f.bg, borderColor: '#C5A059' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm mb-3"
                style={{ background: f.iconBg, color: '#26170C' }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1" style={{ color: '#26170C' }}>
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#3D2B1F', opacity: 0.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}