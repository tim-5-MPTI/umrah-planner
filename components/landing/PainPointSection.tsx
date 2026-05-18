const painPoints = [
  {
    icon: '/images/biaya-total.png',
    title: 'Bingung biaya total',
    desc: 'Sulit memprediksi total pengeluaran dari tiket hingga akomodasi.',
  },
  {
    icon: '/images/aturan-visa.png',
    title: 'Takut salah aturan visa',
    desc: 'Persyaratan visa yang berubah-ubah seringkali membingungkan.',
  },
  {
    icon: '/images/informasi.png',
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
            <h2 className="text-2xl font-bold leading-tight mb-3" style={{ color: '#26170C' }}>
              Mengapa Perencanaan Sering Terasa Berat?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#3D2B1F', opacity: 0.7 }}>
              Kami memahami kerumitan di balik niat suci Anda. Biarkan kami menyederhanakannya.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {painPoints.map((item, i) => (
              <div key={i} className="rounded-2xl p-5"
                style={{ background: '#FDFBF7', borderLeft: '4px solid #26170C' }}>
                <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain mb-4" />
                <h3 className="font-bold text-sm mb-2" style={{ color: '#26170C' }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#3D2B1F', opacity: 0.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}