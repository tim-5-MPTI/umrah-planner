const painPoints = [
  {
    icon: '💸',
    title: 'Bingung biaya total',
    desc: 'Sulit menghitung total pengeluaran dari berbagai komponen hingga akumulasi.',
  },
  {
    icon: '📋',
    title: 'Takut salah aturan visa',
    desc: 'Persyaratan visa yang berubah-ubah dan rumit sangat membingungkan.',
  },
  {
    icon: '🌐',
    title: 'Informasi tersebar',
    desc: 'Info harga dari berbagai sumber yang tidak terpercaya dan tidak terstruktur.',
  },
]

export default function PainPointSection() {
  return (
    <section className="bg-[#E8DFD0] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-[#3D2B1F] leading-tight">
              Mengapa Perencanaan Sering Terasa Berat?
            </h2>
            <p className="text-sm text-[#8B6F5E] mt-3 leading-relaxed">
              Kami memahami kesulitan di balik niat suci Anda. Biarkan kami menyederhanakannya.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {painPoints.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-[#E8DFD0]"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-[#3D2B1F] text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8B6F5E] leading-relaxed">
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