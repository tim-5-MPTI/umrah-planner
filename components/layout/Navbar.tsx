'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/planner', label: 'Planner' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: '#FDFBF7', borderColor: '#D4CCB0' }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Umratee" className="h-8 w-auto"
            onError={(e) => { e.currentTarget.style.display = 'none' }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: isActive ? '#26170C' : '#735C00',
                  background: isActive ? '#EAEAD1' : 'transparent',
                }}>
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/planner" className="hidden md:block">
            <button className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90"
              style={{ background: '#26170C', color: '#FDFBF7' }}>
              Mulai Planner
            </button>
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}>
            <span className="block w-5 h-0.5 transition-all"
              style={{ background: '#26170C', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
            <span className="block w-5 h-0.5 transition-all"
              style={{ background: '#26170C', opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-0.5 transition-all"
              style={{ background: '#26170C', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-2"
          style={{ background: '#FDFBF7', borderColor: '#D4CCB0' }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium"
                style={{
                  color: isActive ? '#26170C' : '#735C00',
                  background: isActive ? '#EAEAD1' : 'transparent',
                }}>
                {link.label}
              </Link>
            )
          })}
          <Link href="/planner" onClick={() => setMenuOpen(false)}>
            <button className="w-full py-3 rounded-xl text-sm font-semibold mt-2"
              style={{ background: '#26170C', color: '#FDFBF7' }}>
              Mulai Planner
            </button>
          </Link>
        </div>
      )}
    </nav>
  )
}