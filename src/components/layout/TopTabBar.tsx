'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/', label: 'Hoy' },
  { href: '/community', label: 'Comunidad' },
]

export default function TopTabBar() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-30 border-b border-brand-border bg-[#0A0A0A]/95 backdrop-blur-md">
      <div className="flex items-center gap-6 px-5 pt-12 pb-3">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href)

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative pb-1 text-lg font-semibold transition-colors cursor-pointer ${
                isActive
                  ? 'text-brand-text-primary'
                  : 'text-brand-text-hint hover:text-brand-text-secondary'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand-gold" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
