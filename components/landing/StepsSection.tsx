const steps = [
  {
    number: 1,
    title: 'Input Perjalanan',
    desc: 'Tentukan tanggal, durasi, dan preferensi kenyamanan Anda',
  },
  {
    number: 2,
    title: 'Lihat Estimasi Biaya',
    desc: 'Algoritma kami menghitung biaya real-time sesuai pasar saat ini',
  },
  {
    number: 3,
    title: 'Simpan Rencana',
    desc: 'Download rencana perjalanan Anda dalam format PDF yang rapi',
  },
]

export default function StepsSection() {
  return (
    <section className="bg-[#F5F0E8] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3D2B1F]">
            Tiga Langkah{' '}
            <span className="underline decoration-[#C9A96E] underline-offset-4">
              Menuju
            </span>{' '}
            Ketenangan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#3D2B1F] text-white flex items-center justify-center font-bold text-sm mb-4">
                {step.number}
              </div>
              <h3 className="font-semibold text-[#3D2B1F] mb-2">{step.title}</h3>
              <p className="text-sm text-[#8B6F5E] leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}