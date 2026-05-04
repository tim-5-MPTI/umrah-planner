import Link from 'next/link'
import Button from '@/components/ui/Button'

const features = [
  {
    icon: '✓',
    title: 'Transparansi Biaya',
    desc: 'Tidak ada biaya tersembunyi. Setiap komponen biaya dipecah secara mendetail.',
    bg: 'bg-white',
    accent: false,
  },
  {
    icon: '📋',
    title: 'Edukasi Visa',
    desc: 'Panduan lengkap dan up-to-date untuk proses pengajuan visa umrah mandiri.',
    bg: 'bg-[#FDECD8]',
    accent: false,
  },
  {
    icon: '📄',
    title: 'Export PDF',
    desc: 'Bawa rencana perjalanan Anda kemana saja dalam format PDF yang rapi dan siap cetak.',
    bg: 'bg-[#E8DFD0]',
    accent: false,
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-[#E8DFD0] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#3D2B1F] mb-10">
          Fitur Utama Untuk Sakinah Anda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:row-span-2 bg-[#3D2B1F] rounded-2xl p-8 flex flex-col justify-end min-h-[280px] relative overflow-hidden">
            <div className="absolute top-6 left-6 opacity-10 text-8xl">✦</div>
            <div className="absolute top-10 right-8 opacity-10 text-6xl">✦</div>
            <div>
              <h3 className="text-white font-bold text-lg mb-2">
                Umrah Budget Planner
              </h3>
              <p className="text-[#C9A96E] text-sm leading-relaxed">
                Kalkulator cerdas yang menyesuaikan dengan gaya perjalanan Anda, dari ekonomis hingga premium.
              </p>
              <Link href="/planner" className="mt-4 inline-block">
                <Button variant="secondary" size="sm">
                  Coba Sekarang →
                </Button>
              </Link>
            </div>
          </div>

          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.bg} rounded-2xl p-5 border border-[#E8DFD0]`}
            >
              <div className="w-8 h-8 rounded-full bg-[#C9A96E] bg-opacity-20 flex items-center justify-center text-[#C9A96E] text-sm mb-3">
                {f.icon}
              </div>
              <h3 className="font-semibold text-[#3D2B1F] text-sm mb-1">
                {f.title}
              </h3>
              <p className="text-xs text-[#8B6F5E] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}