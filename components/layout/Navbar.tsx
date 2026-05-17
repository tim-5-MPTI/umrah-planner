'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/planner', label: 'Planner' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: '#FDFBF7', borderColor: '#D4CCB0' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Umratee"
            className="h-8 w-auto"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: isActive ? '#26170C' : '#735C00',
                  background: isActive ? '#EAEAD1' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = '#F9F6F0'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </Link>
            )
          })}
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