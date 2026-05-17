import Link from 'next/link'

export default function FeaturesSection() {
  return (
    <section className="py-20" style={{ background: '#EAEAD1' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-10" style={{ color: '#26170C' }}>
          Fitur Utama Untuk Sakinah Anda
        </h2>

        <div className="grid grid-cols-2 grid-rows-2 gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>

          {/* Kiri — Umrah Budget Planner (span 2 baris) */}
          <div
            className="row-span-2 rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden"
            style={{ background: '#26170C', minHeight: '300px' }}
          >
            <div className="absolute top-6 left-6 opacity-10 text-7xl select-none" style={{ color: '#FFE088' }}>✦</div>
            <div className="absolute top-8 right-10 opacity-10 text-5xl select-none" style={{ color: '#FFE088' }}>✦</div>
            <div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#FDFBF7' }}>
                Umrah Budget Planner
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#FFE088' }}>
                Kalkulator cerdas yang menyesuaikan dengan gaya perjalanan Anda, dari ekonomis hingga premium.
              </p>
              <Link href="/planner">
                <button
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: '#FFE088', color: '#26170C' }}
                >
                  Coba Sekarang →
                </button>
              </Link>
            </div>
          </div>

          {/* Kanan atas — Transparansi Biaya (full width kanan) */}
          <div
            className="rounded-2xl p-5 border"
            style={{ background: '#FDFBF7', borderColor: '#C5A059' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
              style={{ background: '#FFE088' }}
            >
              <span className="text-sm font-bold" style={{ color: '#26170C' }}>✓</span>
            </div>
            <h3 className="font-bold text-sm mb-1" style={{ color: '#26170C' }}>
              Transparansi Biaya
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#3D2B1F', opacity: 0.7 }}>
              Tidak ada biaya tersembunyi. Setiap komponen biaya dipecah secara mendetail.
            </p>
          </div>

          {/* Kanan bawah kiri — Export PDF */}
          <div className="grid grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-5 border"
              style={{ background: '#FDFBF7', borderColor: '#C5A059' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
                style={{ background: '#FFE088' }}
              >
                <span className="text-sm" style={{ color: '#26170C' }}>📄</span>
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: '#26170C' }}>
                Export PDF
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#3D2B1F', opacity: 0.7 }}>
                Bawa rencana perjalanan Anda kemana saja dalam format PDF yang rapi.
              </p>
            </div>

            {/* Kanan bawah kanan — Edukasi Visa */}
            <div
              className="rounded-2xl p-5"
              style={{ background: '#FDC39A' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
                style={{ background: '#FFE088' }}
              >
                <span className="text-sm" style={{ color: '#26170C' }}>📋</span>
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: '#26170C' }}>
                Edukasi Visa
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#3D2B1F', opacity: 0.7 }}>
                Panduan lengkap dan up-to-date untuk proses pengajuan visa umrah mandiri.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}