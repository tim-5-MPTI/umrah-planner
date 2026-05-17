const steps = [
  { number: 1, title: 'Input Perjalanan', desc: 'Tentukan tanggal, durasi, dan preferensi kenyamanan Anda' },
  { number: 2, title: 'Lihat Estimasi Biaya', desc: 'Algoritma kami menghitung biaya real-time sesuai pasar saat ini' },
  { number: 3, title: 'Simpan Rencana', desc: 'Download rencana perjalanan Anda dalam format PDF yang rapi' },
]

export default function StepsSection() {
  return (
    <section className="py-20" style={{ background: '#FDFBF7' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#26170C' }}>
            Tiga Langkah{' '}
            <span className="underline decoration-2 underline-offset-4"
              style={{ textDecorationColor: '#FFE088' }}>
              Menuju
            </span>{' '}
            Ketenangan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-4"
                style={{ background: '#26170C', color: '#FDFBF7' }}
              >
                {step.number}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#26170C' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed max-w-[200px]"
                style={{ color: '#3D2B1F', opacity: 0.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}