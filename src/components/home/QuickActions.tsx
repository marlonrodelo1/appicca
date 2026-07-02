'use client'

import Link from 'next/link'
import { BookOpen, Heart, MapPin, Calendar, HandHeart, Users, Newspaper, MessageCircle } from 'lucide-react'

const actions = [
  { href: '/bible', label: 'Biblia', icon: BookOpen, color: 'bg-brand-blue-soft text-brand-blue-text' },
  { href: '/prayer', label: 'Oración', icon: Heart, color: 'bg-red-500/10 text-red-400' },
  { href: '/donate', label: 'Donar', icon: HandHeart, color: 'bg-brand-gold-light text-brand-gold' },
  { href: '/events', label: 'Eventos', icon: Calendar, color: 'bg-brand-green-soft text-brand-green-text' },
  { href: '/community', label: 'Comunidad', icon: Users, color: 'bg-purple-500/10 text-purple-400' },
  { href: '/map', label: 'Iglesias', icon: MapPin, color: 'bg-orange-500/10 text-orange-400' },
  { href: '/programs', label: 'Programas', icon: Newspaper, color: 'bg-cyan-500/10 text-cyan-400' },
  { href: '/messages', label: 'Mensajes', icon: MessageCircle, color: 'bg-pink-500/10 text-pink-400' },
]

export default function QuickActions() {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-brand-text-primary">
        Acceso rápido
      </h2>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.color}`}>
                <Icon size={20} />
              </div>
              <span className="text-[11px] font-medium text-brand-text-secondary">
                {action.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
