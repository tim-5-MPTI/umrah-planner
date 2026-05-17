import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#26170C' }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/images/logo.png" alt="Umratee" className="h-6 w-auto" />
          <div className="flex items-center gap-6 text-sm" style={{ color: '#D4CCB0' }}>
            <Link href="#" className="hover:text-white transition-colors">Legal Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
          <p className="text-xs" style={{ color: '#735C00' }}>
            © 2026 Umrah Planner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}