const painPoints = [
  {
    icon: '💸',
    title: 'Bingung biaya total',
    desc: 'Sulit menghitung total pengeluaran dari berbagai komponen hingga akumulasi.',
    bg: '#FDFBF7',
  },
  {
    icon: '📋',
    title: 'Takut salah aturan visa',
    desc: 'Persyaratan visa yang berubah-ubah dan rumit sangat membingungkan.',
    bg: '#FDFBF7',
  },
  {
    icon: '🌐',
    title: 'Informasi tersebar',
    desc: 'Info harga dari berbagai sumber yang tidak terpercaya dan tidak terstruktur.',
    bg: '#FDFBF7',
  },
]

export default function PainPointSection() {
  return (
    <section className="py-20" style={{ background: '#D4CCB0' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold leading-tight"
              style={{ color: '#26170C' }}>
              Mengapa Perencanaan Sering Terasa Berat?
            </h2>
            <p className="text-sm mt-3 leading-relaxed"
              style={{ color: '#3D2B1F', opacity: 0.7 }}>
              Kami memahami kesulitan di balik niat suci Anda. Biarkan kami menyederhanakannya.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {painPoints.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border"
                style={{
                  background: item.bg,
                  borderColor: '#C5A059',
                  borderWidth: '1px',
                }}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-sm mb-2"
                  style={{ color: '#26170C' }}>{item.title}</h3>
                <p className="text-xs leading-relaxed"
                  style={{ color: '#3D2B1F', opacity: 0.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}