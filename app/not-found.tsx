import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#3D2B1F] mb-4">404</h1>
        <p className="text-[#8B6F5E] mb-8">Halaman tidak ditemukan</p>
        <Link href="/" className="bg-[#3D2B1F] text-white px-6 py-3 rounded-lg hover:bg-[#2C1810]">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}