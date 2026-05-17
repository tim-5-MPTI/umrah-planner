import Link from 'next/link'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: '#FDFBF7', borderColor: '#D4CCB0' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
  <img src="/images/logo.png" alt="Umratee" className="h-8 w-auto" />
</Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm transition-colors"
            style={{ color: '#3D2B1F' }}>Beranda</Link>
          <Link href="/planner" className="text-sm transition-colors"
            style={{ color: '#3D2B1F' }}>Planner</Link>
        </div>

        <Link href="/planner">
          <button
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#26170C', color: '#FDFBF7' }}
          >
            Mulai Planner
          </button>
        </Link>
      </div>
    </nav>
  )
}