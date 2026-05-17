const painPoints = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#26170C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: 'Bingung biaya total',
    desc: 'Sulit memprediksi total pengeluaran dari tiket hingga akomodasi.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#26170C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    title: 'Takut salah aturan visa',
    desc: 'Persyaratan visa yang berubah-ubah seringkali membingungkan.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#26170C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Informasi tersebar',
    desc: 'Harus membuka banyak tab hanya untuk mencari satu kepastian.',
  },
]

export default function PainPointSection() {
  return (
    <section className="py-20" style={{ background: '#D4CCB0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-center">

          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold leading-tight mb-3"
              style={{ color: '#26170C' }}>
              Mengapa Perencanaan Sering Terasa Berat?
            </h2>
            <p className="text-sm leading-relaxed"
              style={{ color: '#3D2B1F', opacity: 0.7 }}>
              Kami memahami kerumitan di balik niat suci Anda. Biarkan kami menyederhanakannya.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {painPoints.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-5"
                style={{
                  background: '#FDFBF7',
                  borderLeft: '4px solid #26170C',
                }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-sm mb-2"
                  style={{ color: '#26170C' }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed"
                  style={{ color: '#3D2B1F', opacity: 0.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}