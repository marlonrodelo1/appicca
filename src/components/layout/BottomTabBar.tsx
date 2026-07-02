'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MapPin, BookOpen, Heart, User } from 'lucide-react'

const tabs = [
  { href: '/', label: 'Hoy', icon: Home },
  { href: '/map', label: 'Iglesias', icon: MapPin },
  { href: '/bible', label: 'Biblia', icon: BookOpen },
  { href: '/prayer', label: 'Oración', icon: Heart },
  { href: '/profile', label: 'Perfil', icon: User },
]

export default function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-[#0A0A0A]/95 backdrop-blur-md safe-area-pb">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href)
          const Icon = tab.icon

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 text-xs transition-colors cursor-pointer ${
                isActive
                  ? 'text-brand-gold'
                  : 'text-brand-text-hint hover:text-brand-text-secondary'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.5} />
              <span className="font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
