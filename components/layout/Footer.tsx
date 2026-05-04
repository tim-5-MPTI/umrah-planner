import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#2C1810] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold">
            umrah<span className="text-[#C9A96E]">planner</span>
          </span>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Legal Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>

          <p className="text-xs text-gray-500">
            © 2024 Umrah Planner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}